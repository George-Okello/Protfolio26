import re

with open("src/App.tsx", "r") as f:
    content = f.read()

pattern = r'href=\{link\.href\}\s*onClick=\{\(e\) => scrollToSection\(e, link\.href\)\}\s*className="hover:opacity-60 transition-opacity block border-b border-current/10 pb-4"\s*onClick=\{\(e\) => scrollToSection\(e, link\.href\)\}'
replacement = 'href={link.href}\n                    className="hover:opacity-60 transition-opacity block border-b border-current/10 pb-4"\n                    onClick={(e) => scrollToSection(e, link.href)}'

content = re.sub(pattern, replacement, content)

with open("src/App.tsx", "w") as f:
    f.write(content)

