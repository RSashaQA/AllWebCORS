cd allure-report
npx netlify login
npx netlify build
npx netlify deploy --prod
call sendkeys.bat "fortran-program" "{ENTER}"