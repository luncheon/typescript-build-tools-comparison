# TypeScript (TSX) Build Tools Comparison

TypeScript (TSX) のソースコードをビルド（トランスパイル + バンドル + ミニファイ）するツールをいくつか試しました。各ビルドツールの設定例とビルド時間計測結果をこのリポジトリに残します。  
Preact + Material UI を利用しており、 `'react'` モジュールを `'preact/compat'` に読み替えたり `process.env.NODE_ENV` を `"production"` に置き換えたりしています。

## 対象ビルドツール

- esbuild  
  https://github.com/evanw/esbuild
- webpack  
  https://webpack.js.org/
- Parcel  
  https://parceljs.org/
- Rollup  
  https://rollupjs.org/
  - @rollup/plugin-typescript  
    https://github.com/rollup/plugins/tree/master/packages/typescript
  - @rollup/plugin-babel  
    https://github.com/rollup/plugins/tree/master/packages/babel
  - @rollup/plugin-sucrase  
    https://github.com/rollup/plugins/tree/master/packages/sucrase
  - rollup-plugin-esbuild  
    https://github.com/egoist/rollup-plugin-esbuild
- Snowpack  
  https://www.snowpack.dev/

## ビルド時間

平均は取っていません。

| ビルドツール                                                | ビルド時間 | バンドルサイズ |
| ----------------------------------------------------------- | ---------: | -------------: |
| esbuild                                                     |      0.27s |         154285 |
| webpack 5β キャッシュなし                                   |      7.50s |         157070 |
| webpack 5β ファイルシステムキャッシュあり ファイル変更なし  |      1.65s |         157070 |
| webpack 5β ファイルシステムキャッシュあり ファイル変更あり  |      7.53s |         157070 |
| Parcel キャッシュなし                                       |      9.18s |         733417 |
| Parcel ファイルシステムキャッシュあり ファイル変更なし      |      1.00s |         733417 |
| Parcel ファイルシステムキャッシュあり ファイル変更あり      |      1.58s |         733417 |
| Parcel キャッシュなし --experimental-scope-hoisting         |      8.81s |         171444 |
| Rollup + @rollup/plugin-typescript@2 + rollup-plugin-terser |      4.56s |         146991 |
| Rollup + @rollup/plugin-babel + rollup-plugin-terser        |      4.68s |         146991 |
| Rollup + @rollup/plugin-sucrase + rollup-plugin-terser      |      4.39s |         147550 |
| Rollup + rollup-plugin-esbuild + rollup-plugin-terser       |      4.28s |         146987 |
| Snowpack + @snowpack/plugin-webpack                         |      8.07s |         146765 |

Material UI を利用することでバンドルサイズを大きくしていますが、 Material UI のコードは TypeScript のトランスパイル対象ではありません（.d.ts ファイル + .js ファイルで公開されているため）。トランスパイル対象が大きい場合は結果が変わってくるかもしれません。  
（Snowpack はバンドルツールではありません、このビルド時間で良し悪しを判断しないでください、念のため。）

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
