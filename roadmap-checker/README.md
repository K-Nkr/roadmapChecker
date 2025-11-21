# Roadmap Checker

エンジニア学習の進捗を可視化し、挫折を防ぐためのロードマップ管理ツールです。

## 特徴

- **網羅的なロードマップ**: フロントエンドからバックエンド、DevOpsまで、モダンなWeb開発に必要なスキルセットをカバー。
- **進捗管理**: 各項目のステータス（未着手、学習中、完了）を管理。
- **アウトプット重視**: 「技術選定の理由」や「成果物URL」を記録することで、ポートフォリオ作成を支援。
- **データ永続化**: ブラウザへの自動保存に加え、JSONファイルとしてのインポート/エクスポートに対応。

## 技術スタック

- Next.js (App Router)
- ReactFlow (グラフ描画)
- Tailwind CSS (スタイリング)
- Lucide React (アイコン)

## Getting Started

開発サーバーを起動します:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

[http://localhost:3000](http://localhost:3000) をブラウザで開いてください。

## デプロイ

Vercelへのデプロイが最も簡単です。

1. このリポジトリをGitHubにプッシュします。
2. Vercelにログインし、"Add New Project"を選択します。
3. リポジトリを選択し、"Deploy"をクリックします。

設定は自動的に検出されます。環境変数の設定は特に必要ありません。
