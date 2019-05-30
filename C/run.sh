filename=$1
outfile=${filename%.*}.out
gcc -I ./lib/ ${filename} -o ./out/${outfile}
./out/${outfile}
