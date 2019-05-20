import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

class TestAsServer {


    public static void main(String[] args) throws InterruptedException {
//  start server pe port 3345

        try{
			ServerSocket server= new ServerSocket(2095);
// astept conexiunea la socket pe partea de server                              
			Socket client = server.accept();         
			System.out.print("Connection accepted.");

// canal de scriere
			DataOutputStream out = new DataOutputStream(client.getOutputStream());
			System.out.println("DataOutputStream  created");

// canal de citire
			DataInputStream in = new DataInputStream(client.getInputStream());
			System.out.println("DataInputStream created");   
			
			while(!client.isClosed()){
			System.out.println("Server reading from channel");
// citire            
			String entry = in.readUTF();
			System.out.println("READ from client message - "+entry);
	   
			System.out.println("Server try writing to channel");

			if(entry.equalsIgnoreCase("quit")){
				System.out.println("Client initialize connections suicide ...");
				out.writeUTF("Server reply - "+entry + " - OK");    
						out.flush();
				Thread.sleep(3000);
				break;
			}
			
          
			// Initializare Counteri 
			int countWord = 0; 
			int sentenceCount = 0; 
			int characterCount = 0; 
			int whitespaceCount = 0; 
			  
			if(!(entry.equals(""))) 
			{ 
				  
				characterCount += entry.length(); 
				  
				String[] wordList = entry.split("\\s+"); 
				  
				countWord += wordList.length; 
				whitespaceCount += countWord -1; 
				  
				String[] sentenceList = entry.split("[!?.:]+"); 
				  
				sentenceCount += sentenceList.length; 
			} 
			  
			out.writeUTF("Total word count = " + countWord +"\r\n" +"Total number of sentences = " + sentenceCount + "\r\n" + "Total number of characters = " + characterCount + "\r\n" + "Total number of whitespaces = " + whitespaceCount);
			System.out.println("Server Wrote message to client.");
	  
			out.flush();    

			}
	   
			System.out.println("Client disconnected");
			System.out.println("Closing connections & channels.");

			// inchidere canal socket
			in.close();
			out.close();

			// inchidere socket
			client.close();

			System.out.println("Closing connections & channels - DONE.");
		} catch (IOException e) {
			e.printStackTrace();
        }
    }
}