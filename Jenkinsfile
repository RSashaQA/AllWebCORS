pipeline {
  agent any
  stages {
    stage('prepare workspace') {
      steps {
        sh '''
          rm -rf $WORKSPACE/allure-results
          npx playwright install
          npm i -D @playwright/test
          npm i -D experimental-allure-playwright
          npm i -D allure-commandline
        '''
      }
    }  
    stage('test') {
      steps {
        sh '''
        npx playwright test --workers 6 --reporter=line,experimental-allure-playwright
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