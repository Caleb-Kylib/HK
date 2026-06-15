import os

def replace_in_files():
    old_phone = "+254 700 000 000"
    new_phone = "0718307092"
    old_year = "2024 HakiLine"
    new_year = "2026 HakiLine"
    
    for filename in os.listdir('.'):
        if filename.endswith('.html'):
            with open(filename, 'r', encoding='utf-8') as f:
                content = f.read()
            
            new_content = content.replace(old_phone, new_phone)
            new_content = new_content.replace(old_year, new_year)
            
            # Also handle variations if any
            new_content = new_content.replace("tel:+254700000000", f"tel:{new_phone}")
            
            if new_content != content:
                with open(filename, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")

if __name__ == "__main__":
    replace_in_files()
