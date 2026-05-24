# Otimizacao de imagens - pendente antes do deploy

## Ferramenta recomendada: Squoosh CLI ou cwebp

### Instalar cwebp (macOS/Linux):
brew install webp   # macOS
sudo apt install webp   # Ubuntu

### Recomprimir cada imagem (qualidade 80, mantendo WebP):
cwebp -q 80 src/assets/public/A2.webp -o src/assets/public/A2.webp
cwebp -q 80 src/assets/public/A3.webp -o src/assets/public/A3.webp
cwebp -q 80 src/assets/public/A4.webp -o src/assets/public/A4.webp
cwebp -q 80 src/assets/public/A5.webp -o src/assets/public/A5.webp
cwebp -q 80 src/assets/public/K06.webp -o src/assets/public/K06.webp

### Converter showroom.jpg para WebP:
cwebp -q 80 src/assets/showroom.jpg -o src/assets/showroom.webp

### Apos converter showroom.jpg:
Atualizar a referencia em AboutSection.tsx de showroom.jpg para showroom.webp.

### Remover apos conversao:
src/assets/public/brand/bgg-logo.jpg (2.15 MB, nao utilizado no codigo)
