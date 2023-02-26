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
        bat '''
          npm install --save-dev netlify-cli
        '''
      }
    }
    stage('Testing') {
      steps {
        bat '''
        npx playwright test --workers 5 --project=firefox --reporter=line,allure-playwright
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
        bat '''
        call build.bat
        '''
        bat '''
        call deploy.bat
        '''
    }
  }
}