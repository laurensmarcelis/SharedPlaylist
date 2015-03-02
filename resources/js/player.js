  var videos = [];
  var tellerke = 0;
  var pageready = false;
  var player;
  var widgetIframe;

  function poll() {
    setTimeout(function() {
      $.ajax({
        type:"POST",
        url: "get.php", 
        cache: false,
        success: function(data) {
          updateList(data);
        }, 
        complete: poll()
      });
    }, 10000);
  };

  $(document).ready(function() {
    if(typeof(Storage) !== "undefined" && localStorage.getItem("tellerke") !== null) {

      tellerke = localStorage.getItem("tellerke");
    } else {
      tellerke = 0;
    }

    $.getJSON('playlist.json', function(data) {
     // data = $.parseJSON(data);
     for(var i=0;i<data["tracks"].length;i++){
      videos.push(data["tracks"][i]);
      if(videos[i].type == "youtube"){
        getYouTubeInfo(videos[i].id,i);
      }
      if(videos[i].type == "soundcloud"){
        getSoundcloudInfo(videos[i].title,i);
      }
    }
    playNext(tellerke);
  });

    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    poll();
    getSCWidget();
    
  }); 

  /* Update the track list with the newest data from the json file */
  function updateList(data){
    var data = $.parseJSON(data);
    $("#franky").empty();
    videos = [];
    for(var i=0;i<data["tracks"].length;i++){
      videos.push(data["tracks"][i]);
      if(videos[i].type == "youtube"){
        getYouTubeInfo(videos[i].id,i);
      }
      if(videos[i].type == "soundcloud"){
        getSoundcloudInfo(videos[i].title,i);
      }
    }
  }

  /* on uploading a link checks if it is soundcloud or vimeo or youtube adds it to the videos array and forwards it to be processed */
  $("#jos").on("click",function(){
    var pastedData = $("#karel").val();
    $("#karel").val(" ");
    var success = false;
    var media   = {};
    /* check if it is a youtube link in any form */
    if (pastedData.match('http(s{0,1})://(www.)?youtube|youtu\.be')) {
      if (pastedData.match('embed')) { youtube_id = pastedData.split(/embed\//)[1].split('"')[0]; }
      else { youtube_id = pastedData.split(/v\/|v=|youtu\.be\//)[1].split(/[?&]/)[0]; }
      media.type  = "youtube";
      media.id    = youtube_id;
      success = true;
      sentToFile(media);
      videos.push(media);
      getYouTubeInfo(media.id,videos.length-1);

    }
    /* check if it is a vimeo link in any form (no other logic made for this so outcommented) */
  // else if (pastedData.match('http://(player.)?vimeo\.com')) {
  //     vimeo_id = pastedData.split(/video\/|http:\/\/vimeo\.com\//)[1].split(/[?&]/)[0];
  //     media.type  = "vimeo";
  //     media.id    = vimeo_id;
  //     success = true;
  // }

  /* check if it is a soundcloud link in any form */
  else if (pastedData.match('http(s{0,1})://(www.)?soundcloud\.com')) {
    $.get('http://api.soundcloud.com/resolve.json?url='+pastedData+'&client_id=YOUR_CLIENT_ID', function (result) {
      media.type  = "soundcloud";
      media.id    = result.id;
      media.title = result.title;
      sentToFile(media);
      videos.push(media);
      getSoundcloudInfo(result.title,videos.length-1);
    });
    success = true;
  }
  if (success) { 
    return media; 
  }
  else { alert("No valid media id detected"); }

  return false;
});

  /* add the parsed track's title to the playlist and sees which song is active*/
  function parseresults(data,pos,type) {
    if(type == "youtube"){
      $("#franky").append('<li class="track" id="'+pos+'" title="'+data.entry.title.$t+'"><i class="yt fa fa-youtube-play fa-sm"></i>'+data.entry.title.$t+'</li>');
    }
    if(type == "soundcloud"){
      $("#franky").append('<li class="track" id="'+pos+'" title="'+data.title+'"><i class="sc fa fa-soundcloud fa-sm"></i>'+data.title+'</li>');
    }
    var elems = $('#franky').children('li');
    elems.sort(function(a,b){
      return parseInt(a.id) > parseInt(b.id);
    });
    $('#franky').append(elems);
    
    $('#'+tellerke).addClass('active');
  }

  /* sets the track on which you clicked in the list as active and forwards it to the respective api*/
  $(document).on('click','.track',function(){
    tellerke = $(this).attr('id');
    playNext(tellerke);
  });

  /* add song to the json file */
  function sentToFile(wow){
    console.log("naar file aan het senden");
    $.ajax({
      type: "POST",
      url: "add.php",
      data: { this : wow },
      cache: false,
      success:  function(data){
        console.log("in file");
      }
    });
  }

  function playNext(tellerke){

    $('.track').removeClass('active');
    $('#'+tellerke).addClass('active');

    if(videos[tellerke].type == "youtube"){
      $('#sc-widget').css("display","none");
      $('#player').css("display","inline");
      $("#sc-widget").attr("src","");

      player.loadVideoById(videos[tellerke].id);
      player.playVideo();
    }
    if(videos[tellerke].type == "soundcloud"){
      $('#player').css("display","none");
      $('#sc-widget').css("display","inline");
      if(player){
        player.stopVideo();
      }
      getCloud(videos[tellerke].id);
      getSCWidget();
    } 
  }

  /* remeber position where you where in playlist */
  $( window ).unload(function() {
   localStorage.setItem("tellerke", tellerke);
  });


function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
} 

  /* all logic for getting the soundcloud id and adding it to the song list */
  /* set iframe source of the soundcloud iframe*/
  function getCloud(id){
    $("#sc-widget").attr("src", "https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F"+id+"&show_artwork=false&auto_play=true&color=ff9900&show_comments=false");
  };

  function getSoundcloudInfo(titles,pos) {
    var data = {};
    data.title = titles;
    parseresults(data,pos,"soundcloud");
  }

  function getSCWidget(){

    widgetIframe = $('#sc-widget').attr("id"),
    widget       = SC.Widget(widgetIframe);
    widget.unbind(SC.Widget.Events.FINISH);
    widget.load("http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F"+videos[tellerke].id+"&show_artwork=false&auto_play=true&color=ff9900&show_comments=false");
    // widget.bind(SC.Widget.Events.READY, function() {

      widget.bind(SC.Widget.Events.FINISH, function() {

        tellerke++;
        if(tellerke<videos.length){
        }else{tellerke=0;}

        playNext(tellerke);
        
      });
    // });
  }
  /* end soundcloud logic */

  /* begin youttube logic */

  /* adds youtube player to the page */
  
  function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
      height: '390',
      width: '440',
      videoId:videos[tellerke].id,
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    //getYouTubeInfo(videos[0].id);
  }

  // autoplay video
  function onPlayerReady(event) {
    player.playVideo();

  }

  // when video ends
  function onPlayerStateChange(event) {

    if(event.data === 0) {  
      tellerke++;
      if(tellerke<videos.length){

      }else{tellerke=0;}
      playNext(tellerke);

    }
  }
  function getYouTubeInfo(vidid,pos) {
    $.ajax({
      url: "http://gdata.youtube.com/feeds/api/videos/"+vidid+"?v=2&alt=json&orderby=published&prettyprint=true",
      dataType: "json",
      success: function (data) {parseresults(data,pos,"youtube")}
    });
  }

  /* end youtube logic */