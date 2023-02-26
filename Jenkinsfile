pipeline {
  agent any
  stages {
    stage('Install browser firefox') {
      steps {
        bat '''
          npx playwright install firefox
        '''
        bat '''
          npm i -D @playwright/test allure-playwright allure-commandline
        '''
        bat '''
        
        '''
      }
    }  
    stage('test') {
      steps {
        bat '''
        npx playwright test BrasilCORS.spec.js --workers 5 --project=firefox --reporter=line,allure-playwright
        '''
      }
    }
  }
    post('allure report'){
      always{
        bat'''
        npx allure generate ./allure-results --clean
        '''
        bat'''
        npx allure open ./allure-report
        '''
    }
  }
}