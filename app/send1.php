<?php

    $name = $_POST['name'];
    $phone = $_POST['phone'];
    
    mail('gromovs1989@gmail.com', 'Заявка с сайта: СПЕКТР', "Имя: {$name}, Телефон: {$phone}");

    header("Location: /");
    die();