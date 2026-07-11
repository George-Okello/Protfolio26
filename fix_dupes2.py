import re

with open("src/App.tsx", "r") as f:
    content = f.read()

content = content.replace(
    'href={link.href}                onClick={(e) => scrollToSection(e, link.href)}\n                    className="hover:opacity-60 transition-opacity block border-b border-current/10 pb-4"\n                    onClick={(e) => scrollToSection(e, link.href)}',
    'href={link.href}\n                    className="hover:opacity-60 transition-opacity block border-b border-current/10 pb-4"\n                    onClick={(e) => scrollToSection(e, link.href)}'
)

with open("src/App.tsx", "w") as f:
    f.write(content)

