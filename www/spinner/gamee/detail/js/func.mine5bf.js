function isTelegram(){return $("body").hasClass("telegram-bot")}function isKik(){return $("body").hasClass("kik-bot")}function isFacebook(){return $("body").hasClass("facebook-bot")}function isBot(){return $("body").hasClass("facebook-bot")||$("body").hasClass("kik-bot")||$("body").hasClass("telegram-bot")}function isEmpty(e){return 0===Object.keys(e).length}function getBotsApiUrl(){return $("body").attr("data-bots-api-url")}function isGamee2(){return 2===gameeUI.gameeVer}function isIos(){return window.navigator.userAgent.match(/(iPad|iPhone|iPod)/g)}function isAndroid(){return window.navigator.userAgent.match(/Android/i)}function onPlatform(){var e="";return isFacebook()?e="on-fb":isTelegram()?e="on-telegram":isKik&&(e="on-kik"),e}function formatUsername(e){var a,t=e.split(" ").filter(function(e){return e});return a=t.length>1?t[0]+" "+t[1].charAt(0)+".":e}function addProfilePicture(e){var a,t="../detail/assets/png/avatar-placeholder.png";return a=e?e:t}function IsValidImageUrl(e){var t=new Image;return new Promise(function(a,r){t.onerror=function(){a(!1)},t.onload=function(){a(!0)},t.src=e})}function nth(e){if(e>3&&21>e)return"th";switch(e%10){case 1:return"st";case 2:return"nd";case 3:return"rd";default:return"th"}}