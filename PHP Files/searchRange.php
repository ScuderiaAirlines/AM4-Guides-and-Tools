
<!DOCTYPE html>
<html lang = "en-US">
<head>
  <!--<script async src="https://www.googletagmanager.com/gtag/js?id=UA-153514321-1"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-153514321-1');
  </script>-->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/reset.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="css/design.css?v=<?php echo time(); ?>">
  <link rel="stylesheet" href="css/action.css?v=<?php echo time(); ?>">
  <title>AM4 Flight Database</title>
 </head>
 <body class="profit-calculator">
  <a href="https://scuderiaairlines.github.io/AM4-Guides-and-Tools/index.html" class="back-button-position default-button">Back</a>
  <section>
    <div class="container3">
            <div class="content-all">
                <div class="content-box">
                    <h2>Aircraft Search by Range and Capacity</h2>
                      <div class="form-box">
                        <form action="searchRange.php" method="POST">
                            <input type="text" name="minRangeIn" placeholder="Minimum Range"value="<?php echo isset($_POST['minRangeIn']) ? $_POST['minRangeIn'] : '' ?>">
                            <input type="text" name="maxRangeIn" placeholder="Maximum Range" value="<?php echo isset($_POST['maxRangeIn']) ? $_POST['maxRangeIn'] : '' ?>">
                            <input type="text" name="minCapIn" placeholder="Minimum Capacity" value="<?php echo isset($_POST['minCapIn']) ? $_POST['minCapIn'] : '' ?>">
                            <input type="text" name="maxCapIn" placeholder="Maximum Capacity" value="<?php echo isset($_POST['maxCapIn']) ? $_POST['maxCapIn'] : '' ?>">
                            <input type="text" name="maxPriceIn" placeholder="Maximum Price ($M) (Ex: 1.2)" value="<?php echo isset($_POST['maxPriceIn']) ? $_POST['maxPriceIn'] : '' ?>">
                            <button class="default-button" name="submit" value="Submit me!">Search</button>
                        </form>
                        <br>
                          <p>Best Viewed on Mobile</p>
                      </div>

                </div>
                <?php include_once("script2.php") ?>  
              </div>
            </div>
  </section>
 </body>
 </html>