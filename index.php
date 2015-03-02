<?php

?>
<html>
  <head>
    <link rel="stylesheet" type="text/css" href="resources/css/reset.css">
    <link rel="stylesheet" type="text/css" href="resources/css/style.css">
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <title>Shared playlist - v0.8</title>
  </head>

  <body>
    <!--                                  --
    --    Hello sir or madam,             --
    --    Thank you for showing interest  --
    --    in my very messy code.          --
    --    If you need anything            --
    --    you can contact me on           --
    --    info@undesign.be                --
    --                                    -->
    
    <div class="content">
      <div class="title"> Shared playlist (Alpha)</div>
      <div class="containerofsound right">
        <div id="player" ></div>
        <div id="soundcloud" >
          <iframe id="sc-widget" width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1848538&show_artwork=false&show_comments=false&liking=false&buying=false"></iframe>
        </div>
      </div>
      <div class="left">
        <h3> add a link (youtube or soundcloud)</h3><br>
        <input type="text" id="karel" class="">
        <input type="submit" value="add song" id="jos"> <br/><br/>
        <!-- <input type="submit" value="save new playlist" id="maria"> <br/><br/> -->
        <ul id="franky" class="right tracklist">
        </ul>
      </div>
      <div class="updates">

        <h3>Updates:</h3>
         <p>v0.8:</p>
        <ul>
          <li> fixed bug where only the 1st soundcloud track autoplays the next song in the list</li>
          <li> code more cleaned up and commented</li>
        </ul>
        <p>v0.7:</p>
        <ul>
          <li> playlist position is now saved. Only for browsers supporting local storage</li>
          <li> code cleanup...</li>
        </ul>
        <p>v0.6:</p>
        <ul>
          <li> soundcloud now auto plays next song when it is finished</li>
          <li> soundcloud song can now auto play after a youtube song has ended</li>
          <li> if soundcloud song is last in list. List can now auto restart</li>
          <li> started code cleanup</li>
        </ul>
        <p>v0.5:</p>
        <ul>
          <li> sweet baby jebus. Basics of soundcloud added</li>
          <li> soundcloud links now usable</li>
          <li> soundcloud links now added to json file</li>
          <li> soundcloud links clickable and working in playlist</li>
        </ul>
        <p>v0.4:</p>
        <ul>
          <li> songs are now ordered the same instead of being scrambled all over the place</li>
          <li> this update list...</li>
        </ul>
        <p>v0.3:</p>
        <ul>
          <li> long polling implemented to update song list for all parties on site </li>
          <li> songs are now stored in a json file instead of a text file </li>
          <li> songs now play when clicked in song list no longer need to wait for song to end </li>
          <li> basic css added aswel as this update list </li>
          <li> bug fix where page broke because api loaded before page</li>
        </ul>
        <p>v0.2:</p>
        <ul>
          <li> songs are now saved in a text document </li>
          <li> added songs are currently only client sided </li>
          <li> song list update only after a page refresh </li>
          <li> removed all the cool console.log()</li>
        </ul>
        <p>v0.1:</p>
        <ul>
          <li> basic implementation of youtube api </li>
          <li> regex to filter out youtube video ID's out of any kind of youtube link</li>
          <li> song titles added to a list </li>
        </ul>

        <h3> Todo: </h3>
        <ul>
          <li> add vimeo  </li>
           <strike><li> add soundcloud </li> </strike>
          <li> add multiple playlists </li>
          <li> site styling </li>
          <li> use JS framework (angularJS or Backbone)</li>
        </ul>
      </div>
    </div>
    <script src="resources/js/jquery.min.js" type="text/javascript"></script>
    <script src="resources/js/player.js" type="text/javascript"></script>
    <script src="resources/js/soundcloudapi.js" type="text/javascript"></script>
  </body>
</html>
