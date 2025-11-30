document.addEventListener("DOMContentLoaded", function() {
    // 1. Ambil data dari file JSON
    fetch('data/content.json')
        .then(response => response.json())
        .then(data => {
            console.log("Data loaded:", data);

            // 2. Update Link Pendaftaran & Biaya (Navbar & CTA)
            // Kita menggunakan querySelectorAll karena tombolnya mungkin muncul lebih dari sekali (di navbar & di body)
            
            // Update semua tombol yang punya class 'dynamic-biaya'
            document.querySelectorAll('.dynamic-biaya').forEach(el => {
                el.href = data.link_biaya;
            });

            // Update semua tombol yang punya class 'dynamic-brosur'
            document.querySelectorAll('.dynamic-brosur').forEach(el => {
                el.href = data.link_brosur;
            });

            // Update semua tombol yang punya class 'dynamic-formulir'
            document.querySelectorAll('.dynamic-formulir').forEach(el => {
                el.href = data.link_formulir;
            });

            // 3. Update Gambar Hero (Background Image)
            const heroSection = document.querySelector('.hero');
            if(heroSection) {
                // Cek ukuran layar untuk menentukan gambar mana yang dipakai
                const isMobile = window.innerWidth <= 768;
                const imageUrl = isMobile ? data.hero_mobile : data.hero_desktop;
                
                // Override CSS background
                heroSection.style.backgroundImage = `url('${imageUrl}')`;
            }

            // Update Hero saat layar di-resize (agar responsif real-time)
            window.addEventListener('resize', () => {
                const isMobile = window.innerWidth <= 768;
                const imageUrl = isMobile ? data.hero_mobile : data.hero_desktop;
                if(heroSection) heroSection.style.backgroundImage = `url('${imageUrl}')`;
            });

        })
        .catch(error => console.error('Gagal mengambil data:', error));
});