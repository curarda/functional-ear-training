# Fonksiyonel Kulak — çevrimdışı web sürümü (PWA)

Bu klasör GitHub Pages'e konulmak için hazır. Yayınlandıktan sonra iPhone'da
**Ana Ekrana Ekle** dediğinde gerçek bir uygulama gibi davranır: kendi simgesi,
tam ekran, **ve internet olmadan da açılır** — servis işçisi her şeyi telefona
kaydeder.

Mac gerekmez, Apple hesabı gerekmez, 7 günde bir yenileme yoktur.

## Yayınlama (bir kez, ~3 dakika)

```bash
cd web
git init
git add -A
git commit -m "Fonksiyonel Kulak"
git branch -M main
git remote add origin https://github.com/<kullanıcı-adın>/kulak.git
git push -u origin main
```

Sonra GitHub'da: depo → **Settings** → **Pages** → *Source: Deploy from a branch* →
**main** / **/ (root)** → **Save**.

Bir iki dakika içinde adresin hazır olur:

```
https://<kullanıcı-adın>.github.io/functional-ear-training/
```

## iPhone'a kurmak

1. Bu adresi **Safari**'de aç (Chrome değil — iOS'ta Ana Ekrana Ekle yalnız Safari'de tam çalışır)
2. Paylaş düğmesi (↑) → **Ana Ekrana Ekle** → **Ekle**

Bir kez açtıktan sonra uçak modunda bile çalışır.

## Güncelleme

Ana klasördeki `fonksiyonel-kulak.html` tek gerçek kaynak. Değiştirdikten sonra:

```bash
python ../sync.py     # buraya kopyalar + sw.js önbellek sürümünü artırır
git commit -am "guncelleme" && git push
```

Telefondaki uygulama bir sonraki açılışında kendini günceller (önbellek sürümü
arttığı için eskisini atar).

## Dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | uygulamanın kendisi, tek dosya |
| `sw.js` | servis işçisi — çevrimdışı çalışmayı sağlar |
| `manifest.webmanifest` | uygulama adı, rengi, simgeleri |
| `icon-180/192/512.png` | ana ekran simgeleri |
