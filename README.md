## Meet Mitsuku

Web app deployed at https://meet-mitsuku.moonshot.cloud/. Allows users to chat with [Mitsuku](http://www.mitsuku.com/), 3-time winner of the [Loebner Prize](https://en.wikipedia.org/wiki/Loebner_Prize).

### Installation
* `Meet Mitsuku` app is in `/automator`.
* Depends on Chrome.
* Chrome Kiosk will only open fullscreen and gain focus if no other Chrome windows are currently open. Otherwise it'll just be added as a tab to the most recently used window.


### Notes
* Deployed via [Dokku](http://dokku.viewdocs.io/dokku/) on moonshot.cloud (`54.235.127.100`).
* Chat with Mitsuku via `iframe` with express permission from Steve Worswick, Mitsuku's creator.
* Press spacebar to go from `/` to `/chat`, and press `esc` or `←` to go from `/chat` to `/`.
