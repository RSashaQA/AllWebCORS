pipeline {
  agent any
  stages {
    stage('Preparation of the working space') {
      steps {
        bat '''
          npx playwright install firefox
        '''
        bat '''
          npm i -D @playwright/test allure-playwright allure-commandline
        '''
      }
    }
    stage('Testing') {
      steps {
        bat '''
        npx playwright test --workers 5 --project=firefox --reporter=line,allure-playwright --retries=3
        '''
      }
    }
  }
    post('Creating a report'){
      always{
        script {
          allure([
        includeProperties: false,
        jdk: 'JDK',
        results: [[path: 'allure-results']]
        ])
      }
    }
      failure {
        slackSend color: "ff0000", message: "I see an error in the console, maybe even CORS. CHECK IT!"
    }
  }
}