pipeline {
  agent any
  stages {
    stage('prepare workspace') {
      steps {
        sh '''
          npx playwright install firefox
          npm i -D @playwright/test allure-playwright
        '''
      }
    }  
    stage('test') {
      steps {
        sh '''
        npx playwright test --project=firefox
        '''
      } 
    }
  }
    post('allure report'){
      always{
        script {
            allure([
                    includeProperties: false,
                    jdk: '',
                    properties: [],
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: '$WORKSPACE/allure-results']]
            ])
      }
    }
  }
}