@echo off
FOR %%G IN (*.png) DO TYPE nul>"%%~nG.PNG.FLAGS" && echo _DEFAULT=QUALITYHIGH>>"%%~nG.PNG.FLAGS"