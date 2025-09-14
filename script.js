document.addEventListener('DOMContentLoaded', function() {

    const mainContent = document.getElementById('main-content');
    const openInvitationBtn = document.getElementById('open-invitation');
    const coverSection = document.getElementById('cover');
    
    const audioContainer = document.getElementById('audio-container');
    const backgroundMusic = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // Sembunyikan konten utama pada awalnya
    mainContent.classList.add('hidden');
    audioContainer.classList.add('hidden');

    // Fungsi untuk membuka undangan
    openInvitationBtn.addEventListener('click', function() {
        mainContent.classList.remove('hidden');
        audioContainer.classList.remove('hidden');

        coverSection.style.transition = 'opacity 1s, transform 1s';
        coverSection.style.opacity = '0';
        coverSection.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            coverSection.classList.add('hidden');
        }, 1000);

        document.body.style.overflowY = 'auto'; // Izinkan scroll setelah dibuka

        // Scroll ke bagian intro dengan mulus
        document.getElementById('intro').scrollIntoView({ behavior: 'smooth' });

        playMusic();
        startSectionObserver();
    });

    // Fungsi untuk kontrol musik
    function playMusic() {
        backgroundMusic.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        playPauseBtn.classList.add('playing');
        playPauseBtn.classList.remove('play');
    }

    function pauseMusic() {
        backgroundMusic.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        playPauseBtn.classList.add('play');
        playPauseBtn.classList.remove('playing');
    }
    
    playPauseBtn.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    // Fungsi Countdown Timer
    function startCountdown() {
        // Tentukan tanggal pernikahan (Hari H fix: 5 Oktober 2025)
        const weddingDate = new Date("2025-10-05T00:00:00").getTime();

        const timer = setInterval(function () {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("countdown-timer").innerHTML =
            "<h4>Acara Telah Berlangsung</h4>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = String(days).padStart(2, "0");
        document.getElementById("hours").innerText = String(hours).padStart(2, "0");
        document.getElementById("minutes").innerText = String(minutes).padStart(2, "0");
        document.getElementById("seconds").innerText = String(seconds).padStart(2, "0");
        }, 1000);
    }

    // Jalankan saat halaman dibuka
    window.onload = startCountdown;

        // Fungsi untuk memunculkan section saat di-scroll
        function startSectionObserver() {
            const sections = document.querySelectorAll('.section:not(#cover)');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.2 }); // Section akan aktif saat 20% terlihat

            sections.forEach(section => {
                observer.observe(section);
            });
        }

        startCountdown();
});