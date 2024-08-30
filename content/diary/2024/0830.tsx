import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Code, Cpu, Lightbulb, Rocket } from "lucide-react"
import { Quiz } from '@/components/ui/quiz'

export default function Component() {
  const [showCode, setShowCode] = useState(false)

  const codeSnippet = `
// v0が生成したReactコンポーネントの例
export default function Greeting({ name }) {
  return (
    <div className="p-4 bg-primary text-primary-foreground rounded-md">
      <h1 className="text-2xl font-bold">こんにちは、{name}さん！</h1>
      <p>v0によって生成された挨拶です。</p>
    </div>
  )
}
  `.trim()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">v0へようこそ！</h1>
      <p className="text-xl text-center mb-12">
        次世代のAIコーディングアシスタント、v0の世界を探索しましょう。
      </p>

      <Tabs defaultValue="features" className="mb-12">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="features">特徴</TabsTrigger>
          <TabsTrigger value="beginners">初心者向け</TabsTrigger>
          <TabsTrigger value="advanced">上級者向け</TabsTrigger>
          <TabsTrigger value="interactive">インタラクティブ</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>v0の主な特徴</CardTitle>
              <CardDescription>v0が提供する強力な機能をご紹介します。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Cpu className="w-6 h-6 text-primary" />
                <span>最新のAI技術を活用したコード生成</span>
              </div>
              <div className="flex items-center space-x-2">
                <Code className="w-6 h-6 text-primary" />
                <span>多言語対応と豊富なフレームワークのサポート</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lightbulb className="w-6 h-6 text-primary" />
                <span>インテリジェントな問題解決と提案</span>
              </div>
              <div className="flex items-center space-x-2">
                <Rocket className="w-6 h-6 text-primary" />
                <span>高速なレスポンスとスケーラブルな処理能力</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="beginners">
          <Card>
            <CardHeader>
              <CardTitle>初心者の方へ</CardTitle>
              <CardDescription>プログラミングを始めたばかりの方にもv0は役立ちます。</CardDescription>
            </CardHeader>
            <CardContent>
              <p>v0は、初心者の方でも簡単に使いこなせるように設計されています。基本的な質問から始めて、徐々に複雑なタスクに挑戦していくことができます。例えば、「HTMLの基本構造を教えて」や「簡単なJavaScriptの関数を作りたい」といった質問から始めてみましょう。</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setShowCode(!showCode)}>
                {showCode ? 'コードを隠す' : 'サンプルコードを見る'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>上級者向け機能</CardTitle>
              <CardDescription>経験豊富な開発者の皆様にも、v0は新たな可能性を提供します。</CardDescription>
            </CardHeader>
            <CardContent>
              <p>v0は、複雑なアルゴリズムの実装、大規模アプリケーションのアーキテクチャ設計、最新のWeb技術の活用など、高度な課題にも対応します。また、コードの最適化や、セキュリティの強化についても助言を提供できます。</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">v0の高度な機能：</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>複雑なデザインパターンの実装支援</li>
                  <li>パフォーマンス最適化の提案</li>
                  <li>セキュリティ脆弱性の検出と修正アドバイス</li>
                  <li>クラウドアーキテクチャの設計サポート</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="interactive">
          <Card>
            <CardHeader>
              <CardTitle>インタラクティブ体験</CardTitle>
              <CardDescription>v0の能力を実際に体験してみましょう。</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">以下のクイズに挑戦して、v0についての理解を深めましょう！</p>
              <Quiz
                question="v0が対応していないタスクはどれ？"
                answers={[
                  "Reactコンポーネントの作成",
                  "データベース設計のアドバイス",
                  "料理レシピの提案",
                  "セキュリティ脆弱性の分析"
                ]}
                correctAnswer="料理レシピの提案"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showCode && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>サンプルコード</CardTitle>
            <CardDescription>v0が生成したReactコンポーネントの例です。</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto">
              <code>{codeSnippet}</code>
            </pre>
          </CardContent>
        </Card>
      )}

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">v0を使ってみませんか？</h2>
        <p className="mb-6">あなたのプログラミングジャーニーを、v0が全力でサポートします。</p>
        <div className="flex justify-center space-x-4">
          <Button>今すぐ始める</Button>
          <Button variant="outline">詳細を見る</Button>
        </div>
      </div>
    </div>
  )
}