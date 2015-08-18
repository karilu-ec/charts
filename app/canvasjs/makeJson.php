<?php
$handle = @fopen("OWXO1.txt", "r");
if ($handle) {
    while (($buffer = fgets($handle)) !== false) {
        echo $buffer;
    }
    if (!feof($handle)) {
        echo "Error: unexpected fgets() fail\n";
    }
    fclose($handle);
}

?>