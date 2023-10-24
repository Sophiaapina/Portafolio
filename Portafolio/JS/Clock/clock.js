function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }
  
  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = "white";
    ctx.fill();
  
    // TODO: Dibujar el círculo del borde con degradado
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333'); // Color interior
    grad.addColorStop(1, '#fff'); // Color exterior
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
  
    // TODO: Dibujar el círculo central
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }
  
  function drawNumbers(ctx, radius) {
    // TODO: Asegurarse de mostrar todos los números
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
  
    for (num = 1; num <= 12; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }
  
  function drawTime(ctx, radius) {
    // TODO: Calcular los ángulos de cada manecilla según la hora actual
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    // Convertir la hora en un valor entre 0 y 12
    hour = hour % 12;
    // Dibujar la manecilla de la hora
    drawHand(ctx, (hour + minute / 60) * 30, radius * 0.5, radius * 0.07);
    // Dibujar la manecilla de los minutos
    drawHand(ctx, (minute + second / 60) * 6, radius * 0.8, radius * 0.07);
    // Dibujar la manecilla de los segundos
    drawHand(ctx, (second + now.getMilliseconds() / 1000) * 6, radius * 0.9, radius * 0.02);
  }
  
  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate((pos * Math.PI) / 180); // Convertir grados a radianes
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate((-pos * Math.PI) / 180); // Restaurar la rotación original
  }
  