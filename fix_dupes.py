import re

with open("src/App.tsx", "r") as f:
    content = f.read()

# Replace duplicate onClick
content = content.replace(
    'href={link.href} onClick={(e) => scrollToSection(e, link.href)}\n                onClick={(e) => scrollToSection(e, link.href)}',
    'href={link.href}\n                onClick={(e) => scrollToSection(e, link.href)}'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

