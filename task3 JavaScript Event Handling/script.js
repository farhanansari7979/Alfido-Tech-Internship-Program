document.addEventListener('DOMContentLoaded', function() {
    const colorBtn = document.getElementById('colorBtn');
    const colorCode = document.getElementById('colorCode');
    const body = document.body;
    
   
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    
    function createParticles(e) {
        const btnRect = colorBtn.getBoundingClientRect();
        const x = e.clientX - btnRect.left;
        const y = e.clientY - btnRect.top;
        
        const particles = document.createElement('div');
        particles.className = 'particles';
        particles.style.left = `${x}px`;
        particles.style.top = `${y}px`;
        
       
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('span');
            particle.style.setProperty('--tx', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--ty', `${Math.random() * 200 - 100}px`);
            particle.style.setProperty('--r', `${Math.random() * 360}deg`);
            particle.style.animationDelay = `${Math.random() * 0.5}s`;
            particle.style.backgroundColor = getRandomColor();
            particles.appendChild(particle);
        }
        
        colorBtn.appendChild(particles);
        
       
        setTimeout(() => {
            particles.remove();
        }, 1000);
    }
    
   
    function changeBackgroundColor() {
        const newColor = getRandomColor();
        body.style.backgroundColor = newColor;
        colorCode.textContent = newColor;
        
        
        const rgb = parseInt(newColor.substring(1), 16);
        const r = (rgb >> 16) & 0xff;
        const g = (rgb >> 8) & 0xff;
        const b = (rgb >> 0) & 0xff;
        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        
        if (luminance > 128) {
            document.querySelector('.container').style.color = '#333';
            colorCode.style.color = '#333';
        } else {
            document.querySelector('.container').style.color = '#fff';
            colorCode.style.color = '#fff';
        }
    }
    
   
    colorBtn.addEventListener('click', function(e) {
        changeBackgroundColor();
        createParticles(e);
        
       
        this.classList.add('active');
        setTimeout(() => {
            this.classList.remove('active');
        }, 300);
    });
    
  
    colorCode.textContent = '#F5F7FA';
});