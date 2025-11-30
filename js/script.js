// ========================================
// AMINAH BOARDING SCHOOL - COMPLETE JS
// ========================================

// 1. Navbar Effect
const navbar = document.getElementById('navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // 1. Ambil semua tautan navigasi
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 2. Ambil semua section (target dari tautan)
    // Filter untuk hanya memilih section yang memiliki ID yang relevan dengan menu
    const sections = Array.from(navLinks)
        .filter(link => link.getAttribute('href').startsWith('#') && link.getAttribute('href') !== '#home')
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(section => section !== null); // Pastikan section ada

    // Ambil Section Hero (untuk link Beranda)
    const homeSection = document.getElementById('home');
    if (homeSection) {
        sections.unshift(homeSection); // Tambahkan Beranda di awal
    }


    function updateActiveLink() {
        // Ambil posisi scroll saat ini
        const scrollPosition = window.scrollY;

        // Loop melalui setiap section untuk menentukan mana yang aktif
        let activeSectionId = '';
        
        // Loop terbalik agar jika ada overlap, section terbawah (terdekat ke atas) yang diprioritaskan
        for (let i = sections.length - 1; i >= 0; i--) {
            const currentSection = sections[i];
            
            // Dapatkan posisi atas section relatif ke viewport
            // Gunakan offset yang disesuaikan (misalnya, tinggi navbar + sedikit lebih)
            const sectionTop = currentSection.offsetTop - 150; 

            // Cek apakah posisi scroll sudah melewati bagian atas section
            if (scrollPosition >= sectionTop) {
                activeSectionId = '#' + currentSection.id;
                break; // Hentikan loop karena kita sudah menemukan section teratas yang aktif
            }
        }

        // Jika section aktif ditemukan:
        if (activeSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active-link'); // Hapus dari semua link
                
                // Jika href link sesuai dengan ID section yang aktif
                if (link.getAttribute('href') === activeSectionId) {
                    link.classList.add('active-link'); // Tambahkan ke link yang sesuai
                }
            });
        } 
        
        // Penanganan kasus di mana scroll berada di atas Hero (Beranda)
        else if (homeSection && scrollPosition < homeSection.offsetTop - 150) {
             navLinks.forEach(link => {
                link.classList.remove('active-link');
                if (link.getAttribute('href') === '#home') {
                    link.classList.add('active-link');
                }
            });
        }
    }

    // Panggil fungsi saat terjadi scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Panggil sekali saat dimuat untuk mengatur state awal
    updateActiveLink(); 
});

// 2. Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 3. UNIVERSAL 3D TILT EFFECT (IMPROVED)
// Perbaikan: Efek hover sekarang diterapkan ke KARTU (Parent), bukan konten.
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        // Hitung posisi kursor relatif terhadap tengah kartu
        const x = e.clientX - cardRect.left - cardRect.width / 2;
        const y = e.clientY - cardRect.top - cardRect.height / 2;

        // Rotasi (dividing by 15 makes it snappy)
        const rotateY = x / 15; 
        const rotateX = y / -15; // Invert X axis for natural feel

        // Terapkan transformasi ke KARTU (Parent), bukan hanya konten
        // Scale 1.02 agar saat miring tidak terlihat pinggirannya putus (aliasing)
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Reset saat mouse keluar
    card.addEventListener('mouseleave', () => {
        // Kembalikan transformasi kartu ke posisi semula
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        
        // Transisi halus saat reset
        card.style.transition = 'transform 0.5s ease';
    });
    
    // Hapus transition saat mouse masuk agar tidak delay (laggy)
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// 4. Tab Switcher Logic (Untuk Halaman Pendaftaran)
function openTab(evt, tabName) {
    // Sembunyikan semua tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Hapus class active dari semua tombol tab
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Tampilkan tab yang dipilih
    const selectedTab = document.getElementById(tabName);
    if(selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }
    
    // Tambah class active ke tombol yang diklik
    if(evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
}

// 5. Lightbox Logic (Untuk Galeri)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const facilities = [
        { img: 'assets/images/gedung-asrama.png', title: 'Asrama', desc: 'Asrama Putra Nyaman.' },
        { img: 'assets/images/mesjid.jpg', title: 'Masjid Jami', desc: 'Pusat Ibadah.' },
        { img: 'assets/images/islamic-center.png', title: 'Gedung Olahraga', desc: 'Area Aktivitas Santri.' }
    ];

    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const lbCount = document.getElementById('counter');
    let curIndex = 0;

    document.querySelectorAll('.facility-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
            curIndex = idx;
            lightbox.classList.add('active');
            updateLb();
        });
    });

    const closeBtn = document.getElementById('closeBtn');
    if(closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    
    function updateLb() {
        if(curIndex < 0 || curIndex >= facilities.length) return;
        const item = facilities[curIndex];
        lbImg.src = item.img;
        lbCap.innerHTML = `<strong>${item.title}</strong><br>${item.desc}`;
        lbCount.innerText = `${curIndex + 1} / ${facilities.length}`;
    }

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            curIndex = (curIndex + 1) % facilities.length;
            updateLb();
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            curIndex = (curIndex - 1 + facilities.length) % facilities.length;
            updateLb();
        });
    }
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.classList.remove('active');
    });
}

// ========================================
// GALLERY MODAL UNTUK FASILITAS
// ========================================

// Data gambar untuk setiap fasilitas
const facilityGalleries = {
    masjid: [
        { src: 'assets/images/mesjid.jpg', caption: 'Masjid Islamic Center - Tampak Depan' },
        { src: 'assets/images/mesjid-2.jpg', caption: 'Interior Masjid' },
        { src: 'assets/images/mesjid-3.jpg', caption: 'Ruang Sholat' }
    ],
    sekolah: [
        { src: 'assets/images/gedung-sekolah.jpg', caption: 'Gedung Sekolah - Tampak Luar' },
        { src: 'assets/images/gedung-sekolah-2.jpg', caption: 'Ruang Kelas' },
        { src: 'assets/images/gedung-sekolah-3.jpg', caption: 'Laboratorium' }
    ],
    asrama: [
        { src: 'assets/images/gedung-asrama.png', caption: 'Gedung Asrama - Tampak Depan' },
        { src: 'assets/images/gedung-asrama-2.jpg', caption: 'Kamar Santri' },
        { src: 'assets/images/gedung-asrama-3.jpg', caption: 'Area Bersama' }
    ],
    perpustakaan: [
        { src: 'assets/images/perpustakaan.jpg', caption: 'Perpustakaan - Ruang Baca' },
        { src: 'assets/images/perpustakaan-2.jpg', caption: 'Koleksi Buku' },
        { src: 'assets/images/perpustakaan-3.jpg', caption: 'Area Studi' }
    ]
};

let currentGallery = [];
let currentIndex = 0;

// Fungsi untuk membuka gallery
function openGallery(facilityType, startIndex = 0) {
    currentGallery = facilityGalleries[facilityType] || [];
    currentIndex = startIndex;
    
    if (currentGallery.length === 0) return;
    
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    updateGalleryImage();
}

// Fungsi untuk menutup gallery
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Fungsi untuk update gambar
function updateGalleryImage() {
    const img = document.getElementById('galleryImage');
    const caption = document.getElementById('galleryCaption');
    const counter = document.getElementById('galleryCounter');
    
    if (currentGallery[currentIndex]) {
        img.src = currentGallery[currentIndex].src;
        caption.textContent = currentGallery[currentIndex].caption;
        counter.textContent = `${currentIndex + 1} / ${currentGallery.length}`;
    }
    
    // Update thumbnail active state
    updateThumbnails();
}

// Fungsi navigasi
function nextImage() {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateGalleryImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateGalleryImage();
}

function goToImage(index) {
    currentIndex = index;
    updateGalleryImage();
}

// Fungsi untuk update thumbnails
function updateThumbnails() {
    const container = document.getElementById('thumbnailContainer');
    container.innerHTML = '';
    
    currentGallery.forEach((item, index) => {
        const thumb = document.createElement('div');
        thumb.className = `gallery-thumbnail ${index === currentIndex ? 'active' : ''}`;
        thumb.style.backgroundImage = `url('${item.src}')`;
        thumb.onclick = () => goToImage(index);
        container.appendChild(thumb);
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.style.display === 'flex') {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeGallery();
    }
});

// Initialize facility cards click events
document.addEventListener('DOMContentLoaded', () => {
    const facilityCards = document.querySelectorAll('.facility-card');
    
    facilityCards.forEach((card, index) => {
        const facilityTypes = ['masjid', 'sekolah', 'asrama', 'perpustakaan'];
        const facilityType = facilityTypes[index];
        
        // Add click cursor
        card.style.cursor = 'pointer';
        
        // Add click event
        card.addEventListener('click', () => {
            openGallery(facilityType, 0);
        });
        
        // Add visual feedback
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });
});