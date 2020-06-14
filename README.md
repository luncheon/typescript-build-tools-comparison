# TypeScript (TSX) Build Tools Comparison

TypeScript (TSX) のソースコードをビルド（トランスパイル + バンドル）するツールをいくつか試しました。各ビルドツールの設定例とビルド時間計測結果をこのリポジトリに残します。  
Preact + Material UI を利用しており、 `'react'` モジュールを `'preact/compat'` に読み替えたり `process.env.NODE_ENV` を `"production"` に置き換えたりしています。

## 対象ビルドツール

- esbuild  
  https://github.com/evanw/esbuild
- webpack  
  https://webpack.js.org/
- Parcel  
  https://parceljs.org/
- rollup.js  
  https://rollupjs.org/
  - rollup-plugin-esbuild  
    https://github.com/egoist/rollup-plugin-esbuild
  - @rollup/plugin-sucrase  
    https://github.com/rollup/plugins/tree/master/packages/sucrase
  - @rollup/plugin-typescript  
    https://github.com/rollup/plugins/tree/master/packages/typescript
- Snowpack  
  https://www.snowpack.dev/

## ビルド時間

平均は取っていません。

| ビルドツール                                                   | ビルド時間 | バンドルサイズ |
| -------------------------------------------------------------- | ---------: | -------------: |
| esbuild                                                        |      0.18s |         154285 |
| webpack キャッシュなし                                         |      4.49s |         157070 |
| webpack ファイルシステムキャッシュあり ファイル変更なし        |      1.70s |         157070 |
| webpack ファイルシステムキャッシュあり ファイル変更あり        |      7.98s |         157070 |
| Parcel キャッシュなし                                          |      9.37s |         733417 |
| Parcel ファイルシステムキャッシュあり ファイル変更なし         |      1.00s |         733417 |
| Parcel ファイルシステムキャッシュあり ファイル変更あり         |      1.70s |         733417 |
| Parcel キャッシュなし --experimental-scope-hoisting            |      9.10s |         171444 |
| rollup.js + @rollup/plugin-typescript@2 + rollup-plugin-terser |      4.69s |         146991 |
| rollup.js + @rollup/plugin-sucrase + rollup-plugin-terser      |      4.68s |         147550 |
| rollup.js + rollup-plugin-esbuild + rollup-plugin-terser       |      4.33s |         146987 |
| Snowpack + @snowpack/plugin-webpack                            |     10.36s |         146765 |

Material UI を利用することでバンドルサイズを大きくしていますが、 Material UI のコードは TypeScript のトランスパイル対象ではありません（.d.ts ファイル + .js ファイルで公開されているため）。トランスパイル対象が大きい場合は結果が変わってくるかもしれません。

## 所感

私は esbuild をおすすめします。とにかく速いです。

以下 esbuild v0.5.2 現在の残念な点です。これらよりビルドパフォーマンスが優先されるなら esbuild が第一候補になります。

- TypeScript の型情報はチェックされず単に消去されます。
  - `tsc --noEmit` などによる型チェックが別途必要になります。
- 変更監視機能がありません。
  - [sane](https://github.com/amasad/sane) のような変更監視ツールを別途導入する必要があります。
- CSS などアセットのインポートができません。
  - [PostCSS](https://postcss.org/) などを利用したスタイルシートのビルド（トランスパイル + バンドル）が別途必要になるかと思います。
- プラグインシステムがありません。

## 自分で試したい

```bash
git clone https://github.com/luncheon/typescript-build-tools-comparison.git
cd typescript-build-tools-comparison
npm ci
npm run install
npm run build
```

エントリポイントは `src/index.tsx` です。ソースコードを変えてビルドを試す場合はこのファイルを書き換えてください。

## ライセンス

Good Boy License
