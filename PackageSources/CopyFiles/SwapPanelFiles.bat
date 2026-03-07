@echo off

cd /d "%~dp0\.."

set aircraftPanel=SimObjects\Airplanes\C17\Panel\panel.cfg
set docPanel=DOCUMENTATION\panel.cfg
set temp=DOCUMENTATION\panel_temp.cfg

if not exist "%aircraftPanel%" (
    echo Could not find:
    echo %aircraftPanel%
    echo.
    echo Make sure this script is inside the DOCUMENTATION folder.
    pause
    exit /b
)

if not exist "%docPanel%" (
    echo Could not find:
    echo %docPanel%
    pause
    exit /b
)

REM Swap files
move "%docPanel%" "%temp%" >nul
move "%aircraftPanel%" "%docPanel%" >nul
move "%temp%" "%aircraftPanel%" >nul

echo.
echo Panel.cfg files successfully swapped!
pause