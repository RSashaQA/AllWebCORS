pipeline {
  agent any
  stages {
    stage('prepare workspace') {
      steps {
        bat '''
          npx playwright install firefox
        '''
        bat '''
          npm i -D @playwright/test allure-playwright
        '''
      }
    }  
    stage('test') {
      steps {
        bat '''
        npx playwright test --project=firefox --reporter=line,allure-playwright
        '''
      } 
    }
  }
    post('allure report'){
      always{
        script {
          allure([
        includeProperties: false, 
        jdk: 'JDK', 
        results: [[path: 'allure-results']]
        ])
      }
    }
  }
} 