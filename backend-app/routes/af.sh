
#!/bin/bash

location=/Documents/SpyPi/frontend-app/src/images
cd $location
ls
fname='image'
i=1
j=1
#fname=$fname-$.jpeg

    sudo fswebcam -r 1920x1080 $fname


    if [ -f $fname".jpeg" ]
    then

        echo "exist"
        while [ -f $fname$i".jpeg" ]
        do
           #  echo $fname$i
            i=$((i + j))
        done
        mv $fname $fname$i".jpeg"
        echo $fname$i".jpeg"
    else
        echo "oops not found"

    fi
