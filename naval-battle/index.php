<?php
error_reporting(0);
$ln = $_POST['Ln'];
$kr = $_POST['Kr'];
$fr = $_POST['Fr'];
$mn = $_POST['Mn'];
$str = $ln.$kr.$fr.$mn;

$d = file_put_contents('test',$str,true);

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

</head>
<body>
<script>

</script>
<div class="container">
    <h3 class="text-center">"Морской бой"</h3>
    <h5 class="text-center" style="color: blue; font-size: large" id="user"></h5>
    <form action="" method="post" onsubmit="valid(this)">
        <label for="number">Линкор 5-и палубный</label>
        <input id="Ln" type="number" min="1" max="3" name="Ln" value="1">
        <label for="number">Крейсер 4-х палубный</label>
        <input id="Kr" type="number" min="1" max="4" name="Kr" value="1">
        <label for="number">Фрегат 3-х палубный</label>
        <input id="Fr" type="number" min="1" max="5" name="Fr" value="1">
        <label for="number">Миноносец 2-х палубный</label>
        <input id="Mn" type="number" min="1" max="6" name="Mn" value="1">
        <input  id="say" type="submit">

    <div id="result"></div>
    </form>
    <a href="#" onclick="showFun()"><span id="menu"></span></a>
    <div id="myShowBlock" class="row">
        <div class="col-6">
            <table style="width: 350px" class="text-center ">
                <tr>
                    <th class="name">название</th>
                    <th class="ost">осталось</th>
                    <th class="col">кол-во</th>
                    <th style="font-size: 22px" id="pobedaU" rowspan="4"></th>
                </tr>
                <tr>
                    <td>Линкор</td>
                    <td class="ost" id="linkU"></td>
                    <td class="col" id="lnU">1</td>
                </tr>
                <tr>
                    <td>Крейсер</td>
                    <td class="ost" id="kresU"></td>
                    <td class="col" id="krU">2</td>
                </tr>
                <tr>
                    <td>Фрегат</td>
                    <td class="ost" id="fregU"></td>
                    <td class="col" id="frU"></td>
                </tr>
                <tr>
                    <td>Миноносец</td>
                    <td class="ost" id="minU"></td>
                    <td class="col" id="mnU"></td>
                    <td><b>побед: </b><span id="victoryU"></span></td>
                </tr>
            </table>
        </div>
        <div class="col-6">
            <table style="width: 350px" class="text-center ">
                <tr>
                    <th class="name">название</th>
                    <th class="ost">осталось</th>
                    <th class="col">кол-во</th>
                    <th style="font-size: 22px" id="pobedaC" rowspan="4"></th>
                </tr>
                <tr>
                    <td>Линкор</td>
                    <td class="ost" id="linkC"></td>
                    <td class="col" id="lnC"></td>
                </tr>
                <tr>
                    <td>Крейсер</td>
                    <td class="ost" id="kresC"></td>
                    <td class="col" id="krC"></td>
                </tr>
                <tr>
                    <td>Фрегат</td>
                    <td class="ost" id="fregC"></td>
                    <td class="col" id="frC"></td>
                </tr>
                <tr>
                    <td>Миноносец</td>
                    <td class="ost" id="minC"></td>
                    <td class="col" id="mnC"></td>
                    <td><b>побед: </b><span id="victoryC"></span></td>
                </tr>
            </table>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
        integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
        crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
        integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
        crossorigin="anonymous"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
<script src="js/main.js"></script>
<form class="container text-center">
    <br>
    <button class="btn btn-primary" type="submit">Новая игра</button>
</form>
</body>
</html>