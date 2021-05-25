#echo "[`date '+%F %T'`] Batch script started"

# jqとcurlの存在確認
# https://stackoverflow.com/questions/592620/how-can-i-check-if-a-program-exists-from-a-bash-script
command -v jq 1> /dev/null
JQ=${?}
command -v curl 1> /dev/null
CURL=${?}
if [ ${JQ} -ne 0 -o ${CURL} -ne 0 ]
then
  echo "The required command(s) is not installed"
  exit 1
fi

# 1 在室中の人の番号を一覧で取って来る(curl,jq)
# 2 1人ずつ回す(while read)
curl -s localhost:3000/v1/users_in_room | jq -r .data[].user_id | while read uid
do
  if !(curl -sS -H 'Content-Type:application/json' -d "{\"user_id\":${uid},\"status\":\"success\"}" localhost:3000/v1/room)
  then
    exit 1
  fi
done

#echo "[`date '+%F %T'`] Batch script finished"
exit 0
