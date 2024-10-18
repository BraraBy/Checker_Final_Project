let html;

export default html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/svg+xml" href="https://firebasestorage.googleapis.com/v0/b/storage-image-779ac.appspot.com/o/ZEVAPI%2Fa.png?alt=media&token=43e7e71f-d3e7-405f-a042-815791b0b6cf">
    <title>Server Status</title>
    <style>
      body {
        background-color: #121212;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
        font-family: Arial, sans-serif;
        overflow: hidden; 
      }
      .container {
        text-align: center;
        padding: 50px 60px;
        border: 2px solid #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        background-color: #1e1e1e;
        position: relative;
        z-index: 1;
      }
      h2 {
        color: #00e676;
        font-size: 2em;
        margin: 0 0 30px 0;
      }
      p {
        color: #a5d6a7;
        font-size: 0.9em;
      }
      svg, img {
        margin: 5px 0;
      }
      .bubble {
        position: absolute;
        bottom: -100px;
        width: 40px;
        height: 40px;
        background-color: rgba(0, 230, 118, 0.2);
        border-radius: 50%;
        animation: rise 10s infinite ease-in-out;
        box-shadow: 0 0 10px rgba(0, 230, 118, 0.3);
      }
      .bubble:nth-child(2) {
        width: 60px;
        height: 60px;
        animation-duration: 8s;
        animation-delay: 2s;
      }
      .bubble:nth-child(3) {
        width: 20px;
        height: 20px;
        animation-duration: 12s;
        animation-delay: 4s;
      }
      .bubble:nth-child(4) {
        width: 80px;
        height: 80px;
        animation-duration: 6s;
        animation-delay: 6s;
      }
      .bubble:nth-child(5) {
        width: 50px;
        height: 50px;
        animation-duration: 14s;
        animation-delay: 8s;
      }
      @keyframes rise {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-800px) scale(1.5);
          opacity: 0;
        }
      }
    </style>
  </head>
  <body>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>
    <div class="bubble"></div>

    <div class="container">
      <h2>ZEVEN API</h2>
      <p>Server is up and running.</p>
      <img width="200" height="200" src="https://firebasestorage.googleapis.com/v0/b/storage-image-779ac.appspot.com/o/ZEVAPI%2Fa.png?alt=media&token=43e7e71f-d3e7-405f-a042-815791b0b6cf" alt="imgzev" >
      <p>contact: panthep094@gmail.com</p>
    </div>
    <script>
      const bubbles = document.querySelectorAll('.bubble');
      bubbles.forEach((bubble) => {
        const randomX = Math.random() * window.innerWidth;
        bubble.style.left = randomX + 'px';
      });
    </script>
  </body>
  </html>
  `;
