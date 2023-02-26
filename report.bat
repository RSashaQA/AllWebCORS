java "-DconfigFile=notifications/config.json" -jar notifications/allure-notifications-4.2.1.jar
cd allure-report
npx netlify login
npx netlify build
npx netlify deploy --prod