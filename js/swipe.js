"use strict";
/*   
    Coded by: POCH
    File: swipe.js
    Lines: 125
    Date: 6/03/2017
    Purpose: Swipes like/Dislike on photo by calling swipe() then adds new profile by addNewProfile()
    URL:https://codepen.io/arjentienkamp/pen/MYpYMO?page=1
*/
let doSwipe = function(strCalledFrom) {
    try {
        // it takes operation of all functions which is called in del_search.html
        $(document).ready(function(event) {
            $("div#dvSwipeLike").on("click", function() {
                swipeLike();
            });
            $("div#dvSwipeDislike").on("click", function() {
                swipeDislike();
            });
            addNewProfile('swipe.js=>doSwipe');

            function swipe(strCalledFrom) {
                try {
                    //it swipeLike or swipeDislike by dragging photo
                    Draggable.create("#photo", {
                        throwProps: true,
                        onDragEnd: function(endX) {
                            if (Math.round(this.endX) > 0) {
                                swipeLike('swipe.js=>dvSwipeLike');
                            } else {
                                swipeDislike('swipe.js=>dvSwipeDisLike');
                            }
                            console.log(Math.round(this.endX));
                        }
                    });
                } catch (e) {
                    console.log("swipe issue");
                    console.log("Error Occured: swipe.js => " + "swipe" + " and called from " + strCalledFrom);
                    console.log(e);
                }
            }
            let swipeLike = function(strCalledFrom) {
                try {
                    //if swipes like on swipe_img_content div and finds photo then calls addNewProfile() to add new user profile 
                    let $photo = $("div.swipe_img_content").find('#photo');
                    let swipe = new TimelineMax({
                        repeat: 0,
                        yoyo: false,
                        repeatDelay: 0,
                        onComplete: removephoto,
                        onCompleteParams: [$photo]
                    });
                    swipe.staggerTo($photo, 0.8, {
                        bezier: [{
                            left: "+=400",
                            top: "+=300",
                            rotation: "60"
                        }],
                        ease: Power1.easeInOut
                    });
                    addNewProfile('swipe.js=>swipeLike');
                } catch (e) {
                    console.log("swipe like issue");
                    console.log("Error Occured: swipe.js => " + "swipeLike" + " and called from " + strCalledFrom);
                    console.log(e);
                }
            }
            let swipeDislike = function(strCalledFrom) {
                try {
                    //if swipes dislike on swipe_img_content div and finds photo then calls addNewProfile() to add new user profile 
                    let $photo = $("div.swipe_img_content").find('#photo');
                    let swipe = new TimelineMax({
                        repeat: 0,
                        yoyo: false,
                        repeatDelay: 0,
                        onComplete: removephoto,
                        onCompleteParams: [$photo]
                    });
                    swipe.staggerTo($photo, 0.8, {
                        bezier: [{
                            left: "+=-350",
                            top: "+=300",
                            rotation: "-60"
                        }],
                        ease: Power1.easeInOut
                    });
                    addNewProfile('swipe.js=>swipeDislike');
                } catch (e) {
                    console.log("swipe dislike issue");
                    console.log("Error Occured: swipe.js => " + " and called from " + strCalledFrom);
                    console.log(e);
                }
            }
            let removephoto = function(photo, strCalledFrom) {
                try {
                    //it removes photo by calling remove()
                    $(photo).remove();
                } catch (e) {
                    console.log("remove photo issue");
                    console.log("Error Occured: swipe.js =>" + " and called from " + strCalledFrom);
                    console.log(e);
                }
            }

            function addNewProfile(strCalledFrom) {
                try {
                    //it add new user profile which shows name,age,photos and prepend div.swipe_img_content by creating div having whole user profile then calls swipe()
                    let names = ['Lieke', 'Christina', 'Sanne', 'Soraya', 'Chanella', 'Larissa', 'Michelle'][Math.floor(Math.random() * 7)];
                    let ages = ['19', '22', '18', '27', '21', '18', '24'][Math.floor(Math.random() * 7)]
                    let photos = ['1', '2', '3', '4', '5', '6', '7'][Math.floor(Math.random() * 7)]
                    $("div.swipe_img_content").prepend('<div class="photo" id="photo" style="background-image:url(./img/search/user_images/photo' + photos + '.jpg)">' + '<span class="meta fontFace">' + '<p>' + names + ', ' + ages + '</p>' + '<span class="moments">0</span>' + '<span class="users">0</span>' + '</span>' + '</div>');
                  //url(http://web.arjentienkamp.com/codepen/tinder/photo)  
                  swipe('swipe.js=>addNewProfile');
                } catch (e) {
                    console.log("add new profile issue");
                    console.log("Error Occured: swipe.js =>" + "addNewProfile" + " and called from " + strCalledFrom);
                    console.log(e);
                }
            }
        });
    } catch (e) {
        console.log("do swipe issue");
        console.log("Error Occured: swipe.js =>" + "doSwipe" + " and called from " + strCalledFrom);
        console.log(e);
    }
}