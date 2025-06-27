// Xử lý thêm/chỉnh sửa ảnh đại diện bằng link
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');
    // Thêm nút thêm link ảnh đại diện
    if (avatarPlaceholder) {
        const addLinkBtn = document.createElement('button');
        addLinkBtn.textContent = 'Thêm link ảnh đại diện';
        addLinkBtn.className = 'add-link-avatar-btn';
        addLinkBtn.style.marginTop = '10px';
        avatarPlaceholder.appendChild(addLinkBtn);

        addLinkBtn.addEventListener('click', function() {
            const url = prompt('Nhập link ảnh đại diện (URL):');
            if (url && url.match(/^https?:\/\//i)) {
                profileImg.src = url;
                profileImg.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
            } else if (url) {
                alert('Vui lòng nhập đúng định dạng link ảnh (bắt đầu bằng http hoặc https)');
            }
        });
    }
});
// Xử lý thêm/chỉnh sửa ảnh đại diện bằng link (luôn hiển thị ảnh đại diện nếu có link)
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');
    // Thêm nút thêm link ảnh đại diện
    if (avatarPlaceholder) {
        const addLinkBtn = document.createElement('button');
        addLinkBtn.textContent = 'Thêm link ảnh đại diện';
        addLinkBtn.className = 'add-link-avatar-btn';
        addLinkBtn.style.marginTop = '10px';
        avatarPlaceholder.appendChild(addLinkBtn);

        addLinkBtn.addEventListener('click', function() {
            const url = prompt('Nhập link ảnh đại diện (URL):');
            if (url && url.match(/^https?:\/\//i)) {
                profileImg.src = url;
                profileImg.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
                // Lưu vào localStorage để giữ ảnh khi reload (nếu muốn)
                try { localStorage.setItem('profileImgUrl', url); } catch(e){}
            } else if (url) {
                alert('Vui lòng nhập đúng định dạng link ảnh (bắt đầu bằng http hoặc https)');
            }
        });
        // Tự động hiển thị ảnh đại diện nếu đã có link trong localStorage
        try {
            const savedUrl = localStorage.getItem('profileImgUrl');
            if (savedUrl) {
                profileImg.src = savedUrl;
                profileImg.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
            }
        } catch(e){}
    }
});
// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all tab buttons and tab panes
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        // Copy text to clipboard
        document.execCommand('copy');
        
        // Show success toast
        showToast();
    } catch (err) {
        console.error('Failed to copy text: ', err);
        
        // Fallback for modern browsers
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                showToast();
            }).catch(err => {
                console.error('Clipboard API failed: ', err);
            });
        }
    }
    
    // Remove the temporary textarea
    document.body.removeChild(textarea);
}

// Show toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Profile image upload functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileImg = document.getElementById('profile-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');
    
    // Create hidden file input for image upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);
    
    // Handle image upload
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
                profileImg.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
                
                // Save image to localStorage
                localStorage.setItem('profileImage', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Click to upload image
    function handleImageClick() {
        fileInput.click();
    }
    
    profileImg.addEventListener('click', handleImageClick);
    avatarPlaceholder.addEventListener('click', handleImageClick);
    
    // Load saved image from localStorage
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileImg.src = savedImage;
        profileImg.style.display = 'block';
        avatarPlaceholder.style.display = 'none';
    } else {
        // Set default avatar image
        profileImg.src = 'https://via.placeholder.com/150x150/667eea/ffffff?text=👤';
        profileImg.style.display = 'block';
        avatarPlaceholder.style.display = 'none';
    }
    
    // Save profile name and bio to localStorage
    const profileName = document.querySelector('.profile-name');
    const profileBio = document.querySelector('.profile-bio');
    
    // Load saved profile data
    const savedName = localStorage.getItem('profileName');
    const savedBio = localStorage.getItem('profileBio');
    
    if (savedName) {
        profileName.textContent = savedName;
    }
    if (savedBio) {
        profileBio.textContent = savedBio;
    }
    
    // Save profile data when edited
    profileName.addEventListener('blur', function() {
        localStorage.setItem('profileName', this.textContent);
    });
    
    profileBio.addEventListener('blur', function() {
        localStorage.setItem('profileBio', this.textContent);
    });
});

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add touch support for mobile devices
document.addEventListener('DOMContentLoaded', function() {
    // Add touch feedback for buttons
    const buttons = document.querySelectorAll('.tab-btn, .copy-btn, .social-link');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Adjust layout if needed
    const container = document.querySelector('.container');
    if (window.innerWidth < 768) {
        container.classList.add('mobile');
    } else {
        container.classList.remove('mobile');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        // Add focus indicators for keyboard navigation
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    // Remove focus indicators when using mouse
    document.body.classList.remove('keyboard-nav');
});

// Add accessibility improvements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for better accessibility
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach((button, index) => {
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-controls', button.getAttribute('data-tab'));
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });
    
    tabPanes.forEach(pane => {
        pane.setAttribute('role', 'tabpanel');
        pane.setAttribute('aria-hidden', !pane.classList.contains('active'));
    });
});

// Update ARIA attributes when tabs change
function updateTabAccessibility() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.setAttribute('aria-selected', button.classList.contains('active'));
    });
    
    tabPanes.forEach(pane => {
        pane.setAttribute('aria-hidden', !pane.classList.contains('active'));
    });
}

// Modify the existing tab switching to include accessibility updates
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Update accessibility attributes
            updateTabAccessibility();
        });
    });
});