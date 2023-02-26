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
        publishHTML([
          allowMissing: false,
          alwaysLinkToLastBuild: false, 
          keepAll: false, 
          reportDir: 'allure-report', 
          reportFiles: 'index.html', 
          reportName: 'HTML Report', reportTitles: '', 
          useWrapperFileDirectly: true])
    }
  }
}