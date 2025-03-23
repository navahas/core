## View Wallet
qubic-cli -seed <> -showkeys


## Mint qUSD
qubic-cli \
  -nodeip 185.84.224.94 \
  -nodeport 31841 \
  -seed fwqatwliqyszxivzgtyyfllymopjimkyoreolgyflsnfpcytkhagqii \
  -qxissueasset QUSD 1000000000000 USD 6

## Transfer qUSD
qubic-cli \
  -nodeip 185.84.224.94 \
  -nodeport 31841 \
  -seed fwqatwliqyszxivzgtyyfllymopjimkyoreolgyflsnfpcytkhagqii \
  -qxtransferasset QUSD UXUFAQMCXZPZBCZVXVDCVLBPSZWAMLZHMAVYMYZBWGZJJKIQPDYBFUFAEPHM XBTVPZIOAAWIIFKINJEENAKQQSFDADLKMAEYKZMLLGUVQJDAKPYMWSTBVQQE 1000000

## Get qUSD balance
qubic-cli \
  -nodeip 185.84.224.94 \
  -nodeport 31841 \
  -getasset UXUFAQMCXZPZBCZVXVDCVLBPSZWAMLZHMAVYMYZBWGZJJKIQPDYBFUFAEPHM


## Get Current Tick
qubic-cli \
  -nodeip 185.84.224.94 \
  -nodeport 31841 \
  -getcurrenttick


## Get the curl of the counter
curl -s -X POST http://185.84.224.94/v1/querySmartContract \
  -H "Content-Type: application/json" \
  -d '{
    "contractIndex": 12,
    "inputType": 1,
    "inputSize": 0,
    "requestData": ""
  }' | jq -r '.responseData' | base64 -d | od -t u8 -N8 -An

## Increment Counter

qubic-cli \
-nodeip 185.84.224.94 \
-nodeport 31841 \
-seed fwqatwliqyszxivzgtyyfllymopjimkyoreolgyflsnfpcytkhagqii \
-sendcustomtransaction MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWLWD 1 0 0 ""

--- 

### Wallets 
landlord
fwqatwliqyszxivzgtyyfllymopjimkyoreolgyflsnfpcytkhagqii
xpsxzzfqvaohzzwlbofvqkqeemzhnrscpeeokoumekfodtgzmwghtqm
ukzbkszgzpipmxrrqcxcppumxoxzerrvbjgthinzodrlyblkedutmsy
wgfqazfmgucrluchpuivdkguaijrowcnuclfsjrthfezqapnjelkgll
kewgvatawujuzikurbhwkrisjiubfxgfqkrvcqvfvgfgajphbvhlaos
nkhvicelolicthrcupurhzyftctcextifzkoyvcwgxnjsjdsfrtbrbl
otyqpudtgogpornpqbjfzkohralgffaajabxzhneoormvnstheuoyay
ttcrkhjulvxroglycvlpgesnxpwgjgvafpezwdezworzwcfobevoacx
mvssxxbnmincnnjhtrlbdffulimsbmzluzrtbjqcbvaqkeesjzevllk
jjhikmkgwhyflqdszdxpcjrilnoxerfeyttbbjahapatglpqgctnkue
nztizdwotovhuzchctpfdgylzmsdfxlvdcpikhmptqjbwwgbxavhtwo
lxbjeczdoqyjtzhizbeapkbpvfdbgxxbdbhyfvzhbkysmgdxuzspmwu
zwoggmzfbdhuxrikdhqrmcxaqmpmdblgsdjzlesfnyogxquwzutracm
inkzmjoxytbhmvuuailtfarjgooearejunwlzsnvczcamsvjlrobsof
htvhtfjxzqandmcshkfifmrsrikrcpsxmnemcjthtmyvsqqcvwckwfk

tenant
hmsmhamftvncxcdvxytqgdihxfncarwzatpjuoecjqhceoepysozwlp
wrnohgpgfuudvhtwnuyleimplivlxcaswuwqezusyjddgkdigtueswb

fisfusaykkovsskpgvsaclcjjyfstrstgpebxvsqeikhneqaxvqcwsf
jftgpcowwnmommeplhbvgotjxrtkmiddcjmitbxoekwunmlpmdakjzq
svaluwylhjejvyjvgmqsqjcufulhusbkkujwrwfgdphdmesqjirsoep
lzinqhyvomjzqoyluifguhytcgpftdxndswbcqriecatcmfidbnmvka
mqamjotnshocvekufdqylgtdcembtddlfockjyaotfdvzqpvkylsjjk
asueorfnexvnthcuicsqqppekcdrwizxqlnkzdkazsymrotjtmdnofe
ahfulnoaeuoiurixbjygqxiaklmiwhysazqylyqhitjsgezhqwnpgql
omyxajeenkikjvihmysvkbftzqrtsjfstlmycfwqjyaihtldnetvkrw
zrfpagcpqfkwjimnrehibkctvwsyzocuikgpedchcyaotcamzaxpivq
kexrupgtmbmwwzlcpqccemtgvolpzqezybmgaedaganynsnjijfyvcn
