import re

def check_css(filename):
    with open(filename, 'r', encoding='utf-8') as f:
        text = f.read()
    # remove comments
    text = re.sub(r'/\*.*?\*/', '', text, flags=re.DOTALL)
    # remove strings
    text = re.sub(r'"[^"\\]*(?:\\.[^"\\]*)*"', '""', text)
    text = re.sub(r"'[^'\\]*(?:\\.[^'\\]*)*'", "''", text)

    stack = []
    for line_no, line in enumerate(text.splitlines(), 1):
        for ch in line:
            if ch in '{[(':
                stack.append((ch, line_no))
            elif ch in '}])':
                if not stack:
                    print(f'{filename}: Error unmatched {ch} at line {line_no}')
                    return False
                top, top_line = stack.pop()
                expected = {'}': '{', ']': '[', ')': '('}[ch]
                if top != expected:
                    print(f'{filename}: Mismatch expected {expected} from line {top_line} with {ch} at line {line_no}')
                    return False
    if stack:
        print(f'{filename}: Unclosed {len(stack)}: {stack[:5]}')
        return False
    print(f'{filename}: Perfect! All braces balanced.')
    return True

check_css('css/rebrand.css')
check_css('css/sitewide.css')
