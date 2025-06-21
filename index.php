<?php
// Konfigurasi kelompok
$kelompok = array(
    array(
        'nama' => 'Tri Puji Antoro',
        'nim' => '221011402646',
        'peran' => 'Ketua Kelompok'
    ),
    array(
        'nama' => 'Mohd Zacky Bharya',
        'nim' => '221011403110', 
        'peran' => 'Anggota'
    )
);

// Fungsi untuk redirect setelah beberapa detik
$redirect_delay = 10; // 5 detik
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kelompok Kami</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .container {
            background: rgba(255, 255, 255, 0.95);
            padding: 40px;
            border-radius: 20px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            text-align: center;
            max-width: 600px;
            width: 90%;
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .header {
            margin-bottom: 30px;
        }
        
        .header h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 10px;
            background: linear-gradient(45deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .header p {
            color: #666;
            font-size: 1.1em;
        }
        
        .members {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 20px;
            margin: 30px 0;
        }
        
        .member-card {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            flex: 1;
            min-width: 200px;
            transform: translateY(0);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .member-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
        
        .member-card:nth-child(2) {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .member-card h3 {
            font-size: 1.3em;
            margin-bottom: 10px;
        }
        
        .member-card .nim {
            font-size: 0.9em;
            opacity: 0.9;
            margin-bottom: 8px;
        }
        
        .member-card .peran {
            font-size: 0.8em;
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .redirect-info {
            margin-top: 30px;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            border-left: 4px solid #667eea;
        }
        
        .redirect-info p {
            color: #555;
            margin-bottom: 10px;
        }
        
        .countdown {
            font-size: 1.2em;
            font-weight: bold;
            color: #667eea;
        }
        
        .loading-bar {
            width: 100%;
            height: 4px;
            background: #e0e0e0;
            border-radius: 2px;
            margin-top: 15px;
            overflow: hidden;
        }
        
        .loading-progress {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            width: 0%;
            border-radius: 2px;
            animation: loading 5s linear forwards;
        }
        
        @keyframes loading {
            to {
                width: 100%;
            }
        }
        
        .btn-skip {
            margin-top: 20px;
            padding: 12px 25px;
            background: #667eea;
            color: white;
            border: none;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1em;
            transition: background 0.3s ease;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn-skip:hover {
            background: #5a6fd8;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 20px;
            }
            
            .header h1 {
                font-size: 2em;
            }
            
            .members {
                flex-direction: column;
            }
            
            .member-card {
                min-width: auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Kelompok Kami</h1>
            <p>Perkenalkan anggota kelompok kami</p>
        </div>
        
        <div class="members">
            <?php foreach($kelompok as $member): ?>
                <div class="member-card">
                    <h3><?php echo htmlspecialchars($member['nama']); ?></h3>
                    <div class="nim">NIM: <?php echo htmlspecialchars($member['nim']); ?></div>
                    <div class="peran"><?php echo htmlspecialchars($member['peran']); ?></div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <div class="redirect-info">
            <p>Anda akan diarahkan ke halaman utama dalam:</p>
            <div class="countdown" id="countdown"><?php echo $redirect_delay; ?> detik</div>
            <div class="loading-bar">
                <div class="loading-progress"></div>
            </div>
            <a href="home.php" class="btn-skip">Lewati & Lanjutkan</a>
        </div>
    </div>

    <script>
        // Countdown timer
        let timeLeft = <?php echo $redirect_delay; ?>;
        const countdownElement = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            timeLeft--;
            countdownElement.textContent = timeLeft + ' detik';
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                window.location.href = 'home.php';
            }
        }, 1000);
        
        // Preload home.php untuk transisi yang lebih smooth
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = 'home.php';
        document.head.appendChild(link);
    </script>
</body>
</html>