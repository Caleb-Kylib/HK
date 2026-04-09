import os

def replace_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    replacements = {
        'Maiyani & Co Advocates': 'HakiLine Advocates',
        'Maiyani & Co': 'HakiLine',
        'info@maiyanilaw.co.ke': 'info@hakiline.co.ke',
        'maiyanilaw.co.ke': 'hakiline.co.ke'
    }
    
    new_content = content
    for old, new in replacements.items():
        new_content = new_content.replace(old, new)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")

def main():
    directory = r'c:\Users\HP\Downloads\HK'
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(('.html', '.js', '.css', '.md')):
                replace_in_file(os.path.join(root, file))

if __name__ == "__main__":
    main()
