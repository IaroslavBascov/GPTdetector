import sys
import os
import math
def word_count(str):
    counts = dict()
    for i in range(1,4):
        words = str.split()
        for j in range(len(words)-i-1):
            word=""
            for u in range(0,i):
                word+=words[u+j]
            if word in counts:
                counts[word] += 1/len(words)
            else:
                counts[word] = 1/len(words)
    

    return counts
sys.stdin.reconfigure(encoding="utf-8")
sys.stdout.reconfigure(encoding="utf-8")
os.chdir(os.path.dirname(sys.argv[0]))
f= open('Gpt1.txt','r', encoding='utf8')
gpt1=word_count(' '.join(f.readlines()).upper())
f = open('Gpt2.txt','r',encoding='utf8')
gpt2=word_count(' '.join(f.readlines()).upper())
f = open('Hum1.txt','r',encoding='utf8')
hum1=word_count(' '.join(f.readlines()).upper())
f = open('Hum2.txt','r',encoding='utf8')
hum2=word_count(' '.join(f.readlines()).upper())
realGPT = dict()
realHum = dict()
force=dict()
for key in gpt1:
    if key not in gpt2:
        gpt2[key]=0

for key in gpt2:
    if key not in gpt1:
        gpt1[key]=0
    if key not in hum1:
        hum1[key]=0
    realGPT[key]=(gpt1[key]+gpt2[key])/2

for key in hum1:
    if key not in hum2:
        hum2[key]=0

for key in hum2:
    if key not in hum1:
        hum1[key]=0
    if key not in gpt1:
        gpt1[key]=0
    if key not in gpt2:
        gpt2[key]=0
    if key not in realGPT:
        realGPT[key]=0
    realHum[key]=(hum1[key]+hum2[key])/2
prt="Слово:         GPT:    Ошиб:   Чел:    Ошиб:   Разн:"
print(prt)
fo=0
for key in realGPT.keys():
    force[key]=abs(realGPT[key]-realHum[key])-(abs(gpt1[key]-gpt2[key])+abs(hum1[key]-hum2[key]))/2
force=dict(sorted(force.items(), key=lambda item: item[1]))
force=dict(reversed(force.items()))
i=0
kkkkkk=[]
kkkkkk=list(force.keys())
for key in kkkkkk:
    i+=1
    if i>100:
        force.pop(key)
        realHum.pop(key)
        realGPT.pop(key)
    else:
        fo+=force[key]
for key in realGPT:
    prt="".join([
        str(key),
        " "*(30-len(key)),
        str(math.ceil(realGPT[key]*1000)/10),
        "%    ",
        str(abs(math.ceil(500*(gpt1[key]-gpt2[key]))/10)),
        "%    ",
        str(math.ceil(realHum[key]*500)/10),
        "%    ",
        str(abs(math.ceil(500*(hum1[key]-hum2[key]))/10)),
        "%    ",
        str(abs(math.ceil(realGPT[key]*1000-realHum[key]*1000)/10)),
        "%    ",
        str(force[key])
    ])
    print(prt)
print(str(fo))
f= open('dataGPT.txt','w')
f.write(str(realGPT))
f.close()
f= open('dataHum.txt','w')
f.write(str(realHum))
f.close()
f= open('force.txt','w')
f.write(str(force))
f.close()
while True:
    pass
