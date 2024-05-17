from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
import json

router = APIRouter()
upload_file_path = "uploaded_files.json"

def get_dict():
    with open(upload_file_path) as j_file:
        return json.load(j_file)

@router.post("/api/v1/Intellifix/files/upload")
async def upload_file(file: UploadFile = File(...), d : dict=Depends(get_dict)):
    try:
        # Read the content of the file as text
        contents = await file.read()
        decoded_content = contents.decode()
        
        file_data = {"filename": file.filename, "content": decoded_content}

        if file.filename in d : 
            return {
            "status" : "success",
            "filenane" : file.filename,
            "message": "File already exists"
            }
            
        d[file.filename] = file_data 
        
        with open(upload_file_path, "w+") as json_file:
            json.dump(d, json_file, indent=2)
        

        
        # Return a response confirming the successful upload
        return {
            "status" : "success",
            "filenane" : file.filename,
            "message": "File uploaded successfully"
            }
    except Exception as e:
        return {"error": str(e)}
    


@router.get("/api/v1/Intellifix/files")
async def get_file_details(filename: str, d : dict=Depends(get_dict)):

    if filename not in d:
        raise HTTPException(status_code=404, detail = f"No file with file name {filename}")
    
    file_details = d[filename]
    return {
            "status" : "success",
            "file_details" : file_details,
            "message": "File fetched successfully"
            }

    