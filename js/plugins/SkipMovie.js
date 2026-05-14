/*:
 * @plugindesc Skip movie/video cutscene by pressing a button.
 * @author Claude (for RoroRumbai)
 *
 * @help
 * ============================================================================
 * SkipMovie.js
 * ============================================================================
 * Tekan salah satu tombol berikut saat video/cutscene berjalan untuk skip:
 *   - Enter / Z      (OK button)
 *   - Escape / X     (Cancel button)
 *   - Space          (Shift button)
 *
 * Tidak perlu Plugin Command. Otomatis aktif saat Play Movie dijalankan.
 * ============================================================================
 */

(function () {

    var _Graphics_playVideo = Graphics.playVideo;
    Graphics.playVideo = function (src) {
        _Graphics_playVideo.call(this, src);
        this._skipMovieEnabled = true;
    };

    var _Graphics_isVideoPlaying = Graphics.isVideoPlaying;
    Graphics.isVideoPlaying = function () {
        // Jika skip dipicu, anggap video sudah selesai
        if (this._movieSkipped) {
            this._movieSkipped = false;
            this._skipMovieEnabled = false;
            // Stop elemen video langsung
            var video = document.getElementById('GameVideo') || document.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = video.duration || 9999;
            }
            return false;
        }
        return _Graphics_isVideoPlaying.call(this);
    };

    var _Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        _Scene_Base_update.call(this);
        if (Graphics._skipMovieEnabled) {
            if (Input.isTriggered('ok') || Input.isTriggered('cancel') || Input.isTriggered('shift')) {
                Graphics._movieSkipped = true;
            }
        }
    };

})();