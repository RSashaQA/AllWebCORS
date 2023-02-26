pipeline {
  agent any
  stages {
    stage('Install browser firefox') {
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
        npx playwright test --workers 5 --project=firefox --reporter=line,allure-playwright
        '''
      }
    }
  }
    post('allure report'){
          always{
      bat'''
      allure generate allure-results -o allure-report --clean
      '''
    }
      always{
        script {
          allure([
        includeProperties: false, 
        jdk: 'JDK', 
        results: [[path: 'allure-results']]
        ])
      }
    }
      failure{
        slackSend color: "bad", message: "Message from Jenkins Pipeline"
    }
  }
}