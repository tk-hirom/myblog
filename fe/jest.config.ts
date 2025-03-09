module.exports = {
    preset: 'ts-jest', // TypeScriptファイルをテストするためのプリセット
    testEnvironment: 'node', // テスト環境をNode.jsに設定
    setupFiles: ['dotenv/config'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest', // TypeScriptファイル（.ts, .tsx）をts-jestでトランスパイル
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
    },
    moduleFileExtensions: ['ts', 'js', 'tsx', 'json', 'node'], // モジュールとして解決するファイル拡張子のリスト
};