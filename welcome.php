<?php
session_start();
$_SESSION['masuk'] = true; // Penanda bahwa user sudah melewati halaman welcome
?>
<!DOCTYPE html>
<html>
<head>
    <title>Selamat Datang</title>
    <style>
        body {
            font-family: sans-serif;
            text-align: center;
            background: linear-gradient(#2C5364, #203A43, #0F2027);
            color: white;
            padding-top: 100px;
        }
        .card {
            background: rgba(255, 255, 255, 0.1);
            padding: 40px;
            margin: auto;
            width: 60%;
            border-radius: 10px;
            box-shadow: 0px 0px 10px #000;
        }
        button {
            padding: 10px 20px;
            background-color: #00c6ff;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0072ff;
        }
    </style>
</head>
<body>
    <div class="card">
        <h1>Profil Kelompok</h1>
        <p><strong>Kelompok 5 - Sistem Informasi Pariwisata</strong></p>
        <ul style="list-style: none; padding: 0;">
            <li>👤 Torray Zx (221011400XXX)</li>
            <li>👤 Nama 2 (NIM)</li>
            <li>👤 Nama 3 (NIM)</li>
        </ul>
        <br>
        <form action="index.php" method="get">
            <button type="submit">Next</button>
        </form>
    </div>
</body>
</html>
