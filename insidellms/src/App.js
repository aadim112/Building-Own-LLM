// App.js — InsideLLMs documentation site
// This file shows you EXACTLY how to use every component.
// The pattern for every new topic:
//   1. Add an entry to NAV_ITEMS (for the sidebar)
//   2. Drop a <SectionAnchor id="your-id" /> where the section starts
//   3. Fill with TextSection, ImageBlock, CodeSnippet, Callout, DiagramSection

import './App.css'
import '../src/Styles/components.css';

// ── Layout components (always present) ──────────────────────────
import Sidebar from './Components/Sidebar';

// ── Content building blocks ──────────────────────────────────────
import SectionAnchor  from './Components/SectionAnchor'
import TextSection    from './Components/TextSection';
import ImageBlock     from './Components/ImageBlock';
import CodeSnippet    from './Components/CodeSnippet';
import Callout        from './Components/Callout';
import DiagramSection from './Components/DiagramSection';
// import StickyNote from './Components/StickyNote';
import StickyNotesRail from './Components/StickyNotesRail';
import { SectionTrackerProvider } from './Components/SectionTrackerContext';
import OutputBlock from './Components/OutputBlock';

// ── Interactive diagrams (you'll add more as you go) ─────────────
import AttentionScoreDiagram from './diagrams/AttentionScoreDiagram';
import AttentionWeightsDiagram from './diagrams/AttentionWeightsDiagram';
import LLMBuildingStagesDiagram from './diagrams/LLMBuildingStagesDiagram';
import LLMCapabilitiesDiagram  from './diagrams/LLMCapabilitiesDiagram';
import QKVAttentionDiagram from './diagrams/QKVAttentionDiagram';

// ── Optional: images ─────────────────────────────────────────────
import attentionImg from './assets/attentionImg.png';
import hierarchy from './assets/hierarchy.png'
import transformerarchi from './assets/transformerarchi.png'
import bertgpt from './assets/bertgpt.png'
import stages from './assets/stages.png'
import datasetgpt3 from './assets/datasetgpt3.png';
import gptarchitecture from './assets/gptarchitecture.png';
import LLMStages from './assets/LLM Stages.png'
import dimensions from './assets/dimensions.png'
import tokenization from './assets/tokenization.png'
import bytepair from './assets/bytepair.png'
import datasampling1 from './assets/datasampling1.png'
import databatches from './assets/databatches.png'
import positionalembedding from './assets/positionalembedding.png'
import attention from './assets/attention.png'
import whyattention from './assets/whyattention.png'
import causalMask from './assets/causalMask.png'
import qkv from './assets/qkv.png'
import simplifiedSelfAttention from './assets/simplifiedSelfAttention.png'
import attweightToContextVec from './assets/attweightToContextVec.png'
import sequentialWrapper from './assets/sequentialWrapper.png'
import parallelMultiHead from './assets/parallelMultiHead.png'
import shapeChanging from './assets/shapeChanging.png'


// ════════════════════════════════════════════════════════════════
// NAVIGATION — add / reorder entries here freely
// Each { label, id } matches a <SectionAnchor id="..." /> below
// ════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { label: "Welcome",   id: "intro",
    children: [{ label: "Understanding LLMs", id: "intro"},{ label: "Stages of Building LLMs", id: "stages" },{ label: "Transformer Architecture", id: "transArchi"},
      {label: "About GPT", id:"aboutgpt", children:[{label: "Datasets for GPT-3", id:"datasetcomparison"}]}]
  },
  {label: "Building LLM", id: "LLM", 
    children: [
      {label: "Working with text data", id: "cha2",
        children:[
          {label:"Tokenization", id:"tokenization"},
          {label: "Tokens into TokenId", id:"numbertoken"},
          {label: "Byte Pair Tokenization", id: "ticktoken"},
          {label: "Data Sampling", id:"datasampling"},
          {label: "Input Embedding", id:"embeddigs"}
        ]
      },
      {label: "Attetntion Mechanism", id:"attention",
        children: [
          { label: "Simplified Attention", id: "simple-attention" },
          { label: "Q K V Attention",      id: "qkv-attention" },
          { label: "Causal Attention",     id: "causal-attention" },
          { label: "Multi-Head Attention", id: "multihead-attention" },
          { label: "GPT-2 Scale",         id: "gpt2-attention" },
        ]
      }
    ]
  },
];

function Content() {
  return (
    <>
      {/* ── Introduction ──────────────────────────────────────── */}
      <SectionAnchor id="intro"/>
      <TextSection title="Welcome to InsideLLMs" level={1} titleFont="montserrat" font="poppins"/>
      <p>Welcome </p>
      <TextSection title="Understanding LLM" level={2} titleFont="montserrat" font="poppins">
        <ImageBlock src={hierarchy} alt="" caption="Hierarchical Depiction of LLM" width='80%'></ImageBlock>
        <p>
          An LLM is a neural network designed to understand, generate, and respond to humanlike text. 
          These models are deep neural networks trained on massive amounts of text
          data, sometimes encompassing large portions of the entire publicly available text on
          the internet.
        </p>
        <p>
          Models like this often have tens or even hundreds of billions of parameters, which are the adjustable weights in
          the network that are optimized during training to predict the next word in a sequence.
        </p>
        <p>
          LLMs utilize an architecture called the <span className='highlight'>transformer</span>, which allows them to pay selective attention to different parts of 
          the input when making predictions, making them
          especially adept at handling the nuances and complexities of human language. 
        </p>
      </TextSection>


      <SectionAnchor id="stages"></SectionAnchor>
      <TextSection level={2} titleFont="montserrat" font='poppins' title="Stages of Building and Using LLMs">
        <Callout type='Note' title="What Research Say!">
          Research has shown that when it comes to modeling performance, custom-built LLMs—those tailored for specific tasks or domains—can outperform general-purpose LLMs, such as those provided by ChatGPT, which are designed for a wide array of applications
        </Callout>
        <ImageBlock src={stages} alt="" caption="Pretraining and Fine-Tunning of LLMs" width='80%'></ImageBlock>
        <p>The first step in creating an LLM is to train it on a large corpus of text data, sometimes referred to as raw text.</p>
        <p>The general process of creating an LLM includes pretraining and fine-tuning. The “pre” in “pretraining” refers to the initial phase where a model like an LLM is trained on a large, diverse dataset to develop a broad understanding of language. This pretrained model then serves as a foundational resource that can be further refined
          through fine-tuning, a process where the model is specifically trained on a narrower dataset that is more specific to particular tasks or domains.</p>
        <p>This first training stage of an LLM is also known as <span className='highlight'>pretraining</span>, creating an initial pretrained LLM, often called <span className='highlight'>a base or foundation model</span>. </p>
        <p>After obtaining a pretrained LLM from training on large text datasets, where the LLM is trained to predict the next word in the text, we can further train the LLM on labeled data, also known as <span className='highlight'>fine-tuning.</span></p>
        <p>The two most popular categories of fine-tuning LLMs are <span className='highlight'>instruction fine-tuning</span> and <span className='highlight'>classification fine-tuning</span>. </p>
        <p><span className='highlight-purple'>1. Instruction Fine-tuning :</span> The labeled dataset consists of instruction and answer pairs, such as a query to translate a text accompanied by the correctly translated text. </p>
        <p><span className='highlight-purple'>2. Classification Fine-tuning :</span> The labeled dataset consists of texts and associated class labels—for example, emails associated with “spam” and “not spam” labels.</p>
      </TextSection>

      <SectionAnchor id="transArchi"></SectionAnchor>
      <TextSection title="Transformer Architecture" level={2} titleFont="montserrat" font="poppins">
        <ImageBlock src={transformerarchi} alt="" caption="Simplified Architecture of Transformer" width='70%'></ImageBlock>
        <p>
          Most modern LLMs rely on the transformer architecture, which is a deep neural network architecture introduced in the 2017 paper <span className='highlight'>“Attention Is All You Need”.</span> 
        </p>
        <p>The transformer architecture consists of two submodules: <span className='highlight'>An Encoder and A Decoder</span>.</p>
        <p><span className='highlight-purple'>Encoder :</span> The encoder module processes the input text and encodes it into a series of numerical representations or vectors that capture the contextual information of the input. </p>
        <p><span className='highlight-purple'>Decoder :</span> The decoder module takes these encoded vectors and generates the output text. In a translation task, for example, the encoder would encode the text from the source language into vectors, and the decoder would decode these vectors to generate text in the target language.</p>
        <p>Both the encoder and decoder consist of many layers connected by a so-called self-attention mechanism.</p>
        <p><span className='highlight-purple'>Self-Attention :</span> A key component of transformers and LLMs is the self-attention mechanism, which allows the model to weigh the importance of different words or tokens
          in a sequence relative to each other. This mechanism enables the model to capture
          long-range dependencies and contextual relationships within the input data, enhancing its ability to generate coherent and contextually relevant output.
        </p>
        <p>Later variants of the transformer architecture, such as <span className='highlight'>BERT (short for bidirectional encoder representations from transformers) and the various GPT models (short for generative pretrained transformers)</span>, built on this concept to adapt this architecture for different tasks.</p>
        <ImageBlock src={bertgpt} width='80%'caption="Transformer Architecture of BERT and GPT"></ImageBlock>
        <p>BERT, which is built upon the original transformer's encoder submodule, differs in its training approach from GPT. While GPT is designed for generative tasks, BERT and its variants specialize in masked word prediction, where the model predicts masked or hidden words in a given sentence.</p>
      </TextSection>

      <SectionAnchor id="aboutgpt"></SectionAnchor>
      <TextSection title="Know About GPT" fontFamily="montserrat" font="poppins" level={2}>
        <DiagramSection title="Text Completion vs Zero-shot vs Few-shot">
          <LLMCapabilitiesDiagram />
        </DiagramSection>
        <p>GPT models, primarily designed and trained to perform text completion tasks, also show remarkable versatility in their capabilities. These models are adept at executing both <span className='highlight'>zero-shot and few-shot learning tasks. </span></p>
        <p><span className='highlight-purple'>1. Zero-Shot Learning :</span> A Learning which refers to the ability to generalize to completely unseen tasks without any prior specific examples. </p>
        <p><span className='highlight-purple'>2. Few-Shot Learning :</span> A Learning involves learning from a minimal number of examples the user provides as input. </p>
      </TextSection>
      <SectionAnchor id="datasetcomparison"></SectionAnchor>
      <TextSection title="Datasets Used for GPT-3 Training" level={3} fontFamily="montserrat" font='poppins'>
        <p>The large training datasets for popular GPT- and BERT-like models represent diverse and comprehensive text corpora encompassing billions of words, which include a vast array of topics and natural and computer languages. </p>
        <ImageBlock src={datasetgpt3} alt="" caption="Table 1.1 Datasets used for GPT-3"></ImageBlock>
        <p>Table 1.1 displays the dataset used for GPT-3. The proportions column in the table sums up to 100% of the sampled data, adjusted for rounding errors. Although the subsets in the Number of Tokens column total 499 billion, the model was trained on only 300 billion tokens. The authors of the GPT-3 paper did not specify why the model was not trained on all 499 billion tokens.</p>
        <p><span className='highlight'>The next-word prediction task is a form of self-supervised learning, which is a form of
        self-labeling. This means that we don't need to collect labels for the training data
        explicitly but can use the structure of the data itself: we can use the next word in a sentence or document as the label that the model is supposed to predict.</span></p>
        <p><span className='highlight'>ChatGPT is decoder oriented & Bert is Encoder Oriented.</span></p>
        <p><span className='highlight'>Encoder Oriented Models can look at the word on both left and right side simultaneously.</span></p>
        <p><span className='highlight'>Decoder Oriented Models each token can look are earlier token (left context duting generation).</span></p>
        <p>Models like GPT generate text by predicting text one word at a time, they are considered a type of <span className='highlight'>Autoregressive model</span>.</p>
        <ImageBlock src={gptarchitecture} width='80%' caption="A Simple Architecture of GPT"></ImageBlock>
        <p>The GPT architecture employs only the decoder portion of the original transformer. It is designed for unidirectional, left-to-right processing, making it well suited for text generation and next-word prediction tasks to generate text in an iterative fashion, one word at a time.</p>
      </TextSection>

      <SectionAnchor id="LLM"></SectionAnchor>
        <div style={{width:'100%', display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'Lobster',fontSize:'35px',color:'black', textDecoration:'underline'}}>Large Language Models</div>
        <ImageBlock src={LLMStages} caption="" alt="" width='80%'></ImageBlock>
      <SectionAnchor id="cha2"></SectionAnchor>
        <TextSection title="Working With Text Data" level={1} fontFamily="montserrat" font='poppins'>
          <ImageBlock src={tokenization} alt="" caption="Visualization of Dimensions of word of 3 dimensions"></ImageBlock>
          <p>This involves splitting text into individual word and subword tokens, which can then be encoded into vector representations for the LLM. </p>
          <p>Deep neural network models, including LLMs, cannot process raw text directly. Since text is categorical, it isn't compatible with the mathematical operations used 
            to implement and train neural networks. Therefore, we need a way to represent words as continuous-valued vectors.</p>
          <p>The concept of converting textual data into vector format is often referred to as <span className='highlight'>embedding</span>. Using a specific neural network layer or another pretrained neural network model, we can embed different data types-for example video, audio and text.</p>
          <p>Apart from this neural network there are several algorithms and framework have been developed to generate word embedings. One of the earlier and most popular examples are <span className='highlight'>Word2Vec</span> approach. Word2Vec is trained neural network architecture to generate word embeddings by predicting the context of a word given the target word or vice versa.</p>
          <Callout type='tip' title="What Exactly Word2Vec is?">
            <p>The embeddings learned by Word2Vec are static embeddings, meaning a word always has the same vector regardless of the sentence. This embeddings are formed after training certain neural network on <span className='highlight'>50,000 words</span> and the <span className='highlight'>demension of one word embedding is 300</span>. i.e A word from Word2Vec is represented in array containing 300 values.</p>
          </Callout>
          <Callout type='math' title="More About GPT!">
            <p>The smallest GPT-2 models(117M and 125M parameters) use embedding size of <span className='highlight'>176 dimensions</span>. The largest GPT-3 model (178B parameters) uses an embedding size of <span className='highlight'>12,288 dimensions.</span></p>
          </Callout>
        </TextSection>
        <SectionAnchor id="tokenization"></SectionAnchor>
        <TextSection level={2} title="Tokenizing Text" fontFamily="montserrat" font='poppins'>
          <p>Tokenizing Text involves spitting text into individual words or special character, including punctuation characters.</p>
          <span className='highlight'>To perform tokenization we will currently use vedict.txt file from the following link: </span>
          <a href=''>Download Verdict.txt from here</a>
          <p>Let's Check verdict.txt file using python.</p>
          <CodeSnippet language='PY' title="Checking Verdict.txt">
            {`

with open('verdict.txt', 'r') as file:
    verdict = file.read().strip()
print("The length of the verdict is:", len(verdict))
print(verdict[:100])
            `}
          </CodeSnippet>
          <OutputBlock>
            {`
            The length of the verdict is: 20479
I HAD always thought Jack Gisburn rather a cheap genius--though a good fellow enough--so it was no g
            `}
          </OutputBlock>
          <p>By the output we get to know that there are 20,479 characters in verdict.txt file and first 100 words are outputed.</p>

          <p>Further we split this text so we get an collection of individual words, special characters etc. </p>
          <CodeSnippet language='PY' title="Splitting Text">
            {`
import re
text = re.verdict.split(r'(\s), text)
print(text[:10])
            `}
          </CodeSnippet>
          <p>We have splitted the complete verdict into using <snap className="highlight">re library</snap>. The output has first 10 elements of the collection.</p>
          <OutputBlock>
            {`
['Hello', '', 'world','','This','','is','','a','']
            `}
          </OutputBlock>
          <p>The output consist of words and whitespaces too.</p>
          <Callout type='tip' title="When to keep white spaces">
            We can include the whitespaces as a token and further convert into embedding when there is importance of whitespace in the ouptput of the LLM. Example: Developing LLM to code there is importance of whitespaces for indentation in python. 
            For simple text generation we can add space after every word generated by the LLM.
          </Callout>
        </TextSection>
        <SectionAnchor id="numbertoken"></SectionAnchor>
        <TextSection level={3} title="Converting tokens into tokenID" fontFamily="montserrat" font='poppins'>
          <p>We will convert the tokens into tokenID. This can be done by two ways.</p>
          <p><span className='highlight'>By Creating Vocab :</span> In this processes we have our own words which are mapped to numbers and we use this vocab to convert the required words to number/IDs.</p>
          <p><span className='highlight'>Using Existing Vocab :</span> This is pre-build vocab which we can use to find the ids of the required word.</p>
          <p>Tokenizing text is no big deal it's simply like searching a dictionary which has words and there respective IDs. And this dictionary can be used to find the ID of each Word or Word for each ID.</p>
          <p>Rather then creating own tokenizer it's preferable to use pre-build libraries. Since bulding own tokenizer will consume time and resourses and complex implementation. Also tokenizer created on niche data often performs poorly on standard, everyday text.</p>
          <p>Sometimes for tokenizer some words can be new and hence it won't have exact Id for that word. In this case tokernizer uses Special context token such as <span className='highlight'>{"<|unk|>"}</span>.</p>
          <p>Also Tokenizer can have such special tokens to indicate end of line eg: <span className='highlight'>{"<|endoftext|>"}</span>.</p>
          <p><span className='highlight'>Creating Custom Tokenizer</span></p>
          <CodeSnippet language='PY' title="Custom Tokenizer">
            {`
class SimpleTokenizer():

            `}
          </CodeSnippet>
          <OutputBlock>
          </OutputBlock>
          <p>GPT Models do not use standard tokenizer, rather they use something called <span className='highlight'>Byte-Pair Tokenization</span>.</p>
        </TextSection>
        <SectionAnchor id="ticktoken"></SectionAnchor>
        <TextSection level={3} title="Tokenization using tiktoken and byte pair encoding" font='poppins'>
          <h3 style={{fontFamily:'poppins'}}>Why use Byte Pair Tokenizer!</h3>
          <ImageBlock src={bytepair} alt="" caption="Overview of Byte Pair Tokenizer" width='70%'></ImageBlock>
          <p>Byte Pair Encoding can efficiently handle unknown words, rare words and subwords without requiring every possible word to be in vocabulary.A custom word-level tokenizer would need a huge vocab and would produce many out-of-vocabulary tokens.</p>
          <p><span className='highlight'>Byte Pair tokenizer</span> was used to train LLMs such as GPT-2, GPT-3, and the original model use in ChatGPT. <span className='highlight'>ticktoken</span> library helps us apply Byte Pair tokenization therefore we will tokenize the text using ticktoken.
          Since the ticktoken has several tokanizations we will be using the <span className='highlight'>"gpt2"</span> which has vocab size of 50,258. By this we mean "ticktoken gpt2" can encode around 50,258 unique words.
          </p>
          <CodeSnippet language='PY' title="Creating tokenizer">
            {`import tiktoken
  tokenizer = tiktoken.get_encoding("gpt2")
  # print(tokenizer.max_token_value+1) #50,258
  encoded = tokenizer.encode(verdict)
  print("The number of tokens in the verdict is:", len(encoded))
  print(encoded[:10])

  #decoding the token ids back to text
  decoded_ids = tokenizer.decode(encoded)
  print(decoded_ids[:100])
  `
            }
          </CodeSnippet>
          <OutputBlock>
            {`
            The number of tokens in the verdict is: 5145
  [40, 367, 2885, 1464, 1807, 3619, 402, 271, 10899, 2138]
  I HAD always thought Jack Gisburn rather a cheap genius--though a good fellow enough--so it was no g
            `}
          </OutputBlock>
          <p>In this code we have created tokenizer instance "tokenizer" which has gpt2 vocab. The encode() method encodes the text into tokenId and the decode() method decodes the encoded list into text.</p>
        </TextSection>
        <SectionAnchor id="datasampling"></SectionAnchor>
        <TextSection level={3} title="Data Sampling" font='poppins'>
          <p>As of now we have converted the words into numbers which will further used for creating embeddigs. Since our model has to guess the next word threfore model must have some previous information or context and target. This is achieved by data sampling. </p>
          <ImageBlock src={datasampling1} alt="" caption="Data Sampling representation" width='70%'></ImageBlock>
          <p>In the above image the highlighted light blue words/tokens are the context and the highlighed red word is the target which the model has to predict. Every time the model predicts the new word the predicted word joins the context and help
            model to predict it's next word. We can decide how many words must be visible to the model in order to predict the next word this length of context is called as <span className='highlight'>context length.</span> For smallest GPT model "gpt-2" it's 1024 words.
          </p>
          <CodeSnippet title="Sample Implementation of data sampling">
            {`
            # Demo Implementing Data Sampling
  context_size = 4
  x = encoded[:context_size]
  y = encoded[1:context_size+1]
  print("X",x)
  print("Y",y)
            `}
          </CodeSnippet>
          <OutputBlock>
            {`
            X [40, 367, 2885, 1464]
  Y [367, 2885, 1464, 1807]
            `}
          </OutputBlock>
          <p>In the above code we have considered context size of 4. X consist of 4 tokens and so the Y. X being input the model has to predict the first element of Y i.e 367. After predicting 367 the 367 joins X and helps predict 2885 but this time the X loosed 1 value since it's context size was 40. X will become <span className='highlight'>[367, 2885, 1464, 367]</span>.</p>
          <h3 style={{fontFamily:'poppins'}}>Creating Data Batches</h3>
          <p>Implementing an efficient data loader that iterates over the input dataset and returns the inputs and targets as PyTorch tensors, which can be thought of as multidimensional arrays.
          we are interested in returning two tensors: an input tensor containing the text that the LLM sees and a target tensor that includes the targets for the LLM to predict</p>
          <ImageBlock src={databatches} width='80%' alt="" caption="Data Batches Representation"></ImageBlock>
          <p>In the above image we have a batch which contains </p>
          <CodeSnippet language='PY' title="Data Loader Class">
            {`
  import torch 
  from torch import nn
  from torch.utils.data import Dataset, DataLoader

  class GPTDataset(Dataset):
      def __init__(self, encoded_data, tokenizer, max_length, stride):
          self.input_id = []
          self.target_id = []

          for i in range(0, len(encoded_data)-max_length, stride):
              input_chunk = encoded_data[i:i+max_length]
              target_chunk = encoded_data[i+1:i+max_length+1]
              self.input_id.append(torch.tensor(input_chunk))
              self.target_id.append(torch.tensor(target_chunk))
              
      def __len__(self):
          return len(self.input_id)
      
      def __getitem__(self, idx):
          return self.input_id[idx], self.target_id[idx]
            `}
          </CodeSnippet>
          <p>The <span className='highlight-grey'>GPTDataset</span> class prepares training data for a GPT model by splitting the tokenized text into overlapping input and target sequences. 
          <span className='highlight-grey'>input_id</span> stores chunks of tokens of length max_length, while target_id stores the same chunks shifted by one position so that the model learns to predict the next token.
          The <span className='highlight-grey'>__getitem__()</span> method returns one <span className='highlight-grey'>(input, target)</span> pair, and the <span className='highlight-grey'>DataLoader</span> later groups these pairs into batches for training.
          </p>
          <CodeSnippet language='PY' title="">
            {`
  def create_dataloader(txt,batch_size=8, max_length=4, stride=4,shuffle=False,drop_last = True, num_workers=0):
      tokenizer = tiktoken.get_encoding("gpt2")
      encoded_text = tokenizer.encode(txt, allowed_special={'<|endoftext|>'})
      data = GPTDataset(encoded_text, tokenizer, max_length, stride)
      dataLoader = DataLoader(data, batch_size=batch_size, shuffle=shuffle, drop_last=drop_last, num_workers=num_workers)
      return dataLoader
            `}
          </CodeSnippet>
          <p>The <span className='highlight-grey'>create_dataloader</span> function combines the <span className='highlight-grey'>GPTDataset</span> and <span className='highlight-grey'>DataLoader</span> to create Data Batches.
          <OutputBlock>
            {`
            GPTDataset returns the object which contains:

  input_id: 
  [
  tensor([10,11,12,13]),
  tensor([12,13,14,15]),
  tensor([14,15,16,17])
  ]

  target_id:
  [
  tensor([11,12,13,14]),
  tensor([13,14,15,16]),
  tensor([15,16,17,18])
  ]
            `}
          </OutputBlock>
          The DataLoader used data object to retrieve the lists from "data" and converts them into batches. Each batch contains around 8 tensor.
          </p>
          <CodeSnippet language='PY'>
            {`dataLoader = create_dataloader(verdict,batch_size=8,max_length=4,stride=4,shuffle=False)
data_itr = iter(dataLoader)
inputs, targets = next(data_itr)
print(inputs)
print(targets)
print(inputs.shape,targets.shape)
print(len(dataLoader))
            `}
          </CodeSnippet>
          <OutputBlock>
            {`
  tensor([[   40,   367,  2885,  1464],
          [ 1807,  3619,   402,   271],
          [10899,  2138,   257,  7026],
          [15632,   438,  2016,   257],
          [  922,  5891,  1576,   438],
          [  568,   340,   373,   645],
          [ 1049,  5975,   284,   502],
          [  284,  3285,   326,    11]])
  tensor([[  367,  2885,  1464,  1807],
          [  3619, 402,  271,   10899],
          [  2138,  257,  7026, 15632],
          [  438,  2016,  257,    922],
          [  5891,  1576,  438,   568],
          [  340,  373,  645,    1049],
          [  5975,  284,  502,    284],
          [  3285,  326,  11,     287]])
  torch.Size([8, 4]) torch.Size([8, 4])
  160
            `}
          </OutputBlock>
          <p>The input of the first batch out of 160 contains the 8 tensors list since the batch size was 8. The shape of input and target is [8,4] which means input or target contains 8 sentences list where each list contains 4 tokens. </p>
        </TextSection>

        <Callout type='Note' title="Summary Of DataLoader">
              The <span className='highlight-grey'>create_dataloader()</span> function first tokenizes the input text and creates a <span className='highlight-grey'>GPTDataset</span>. The GPTDataset stores each training example as a tuple <span className='highlight-grey'>(input_chunk, target_chunk)</span>. The DataLoader then takes these tuples and groups them into <span className='highlight-grey'>batches</span>. If batch_size=8, each batch <span className='highlight-grey'>contains 8 (input_chunk, target_chunk) tuples</span>, which are automatically stacked into two tensors: one for all the inputs and one for all the targets. 
        </Callout>

        <SectionAnchor id="embeddigs"></SectionAnchor>
        <TextSection title="Embeddings" level={3} font='poppins'>
          <p>The last step in preparing the input text for LLM training is to convert the token IDs into embedding vectors. As a preliminary step, we must initialize these embedding weights with random values.
            Embedding a token is converting a token into n-dimensional vector.
          </p>
          <p>We have a tensor as :</p>
          <span className='code-line'>input_ids = torch.tensor([2, 3, 5, 1])</span>
          <p>For the sake of simplicity, suppose we have a small vocabulary of only 6 words (instead of the 50,257 words in the BPE tokenizer vocabulary), and we want to create embeddings of size 3 (in GPT-3, the embedding size is 12,288 dimensions):</p>
          <span className='code-line'>vocab_size = 6</span>
          <br></br>
          <span className='code-line'>output_dim = 3</span>
          <br></br>
          <span className='code-line'>
          embedding_layer = torch.nn.Embedding(vocab_size, output_dim)<br></br>
          print(embedding_layer.weight)
          </span>
          <p>The print statement prints the embedding layer's underlying weight matrix:</p>
          <OutputBlock>
            {`
  Parameter containing:
  tensor([[ 0.3374, -0.1778, -0.1690],
  [ 0.9178, 1.5810, 1.3010],
  [ 1.2753, -0.2010, -0.1606],
  [-0.4015, 0.9666, -1.1481],
  [-1.1589, 0.3255, -0.6315],
  [-2.8400, -0.7849, -1.4096]], requires_grad=True)
            `}
          </OutputBlock>        
          <p><span className="highlight">For our GPT Model we need to create a Embedding of 256 dimensions or output dimensions and our vocab size is 50,257.</span></p>
          <Callout type='math' title="What actually Embedding() does.">
            The Embedding simply acts as a dictionary. It lookout for the specific integer or token and retrives it's embedding vector. This embeddings can also be obtained by pretrained models such as Word2Vec as discussed before.
            Since we have 50,257 vocab therefore there must be individual embedding for each token. So our Embedding dictionary has 50,257 embeddings.
          </Callout>
          <CodeSnippet language='PY' title="Embedding instance">
            {`token_encodingLayer = nn.Embedding(50257,256)`}
          </CodeSnippet>
          <h3>Adding Positional Embeddings to the token embeddings.</h3>
          <ImageBlock src={positionalembedding} alt="" caption="Addition of positional embedding"></ImageBlock>
          <p>Positional embeddings are added to token embeddings to provide information about the position of each token in the sequence.
            Without positional embeddings, the Transformer only sees a set of token embeddings and cannot distinguish between: <span className='highlight-grey'>"I Love Her"</span> and <span className='highlight-grey'>"Her Love I"</span>
          </p>
          <CodeSnippet language='PY' title="Adding Positional Embeddings">
            {`#Creating positional encodings for the input tokens
  pos_embeddingLayer = nn.Embedding(4,256)
  pos_encodings = pos_embeddingLayer(torch.arange(4))`}
          </CodeSnippet>
          <p>By <span className='highlight-grey'>pos_embeddingLayer(torch.arange(4))</span> we mean there are 4 possible positions: <span className='code-line'>0, 1, 2, 3</span></p>
          <p>Each position is mapped to a vector of size 256. Internally, PyTorch creates a learnable weight matrix:</p>
          <span className='code-line'>
  Position---Embedding Vector (256 values)
  <br></br>
  0 -------- [0.12, -0.45, ..., 0.78]
  <br></br>
  1 -------- [1.34,  0.22, ..., -0.11]
  <br></br>
  2 -------- [-0.87, 0.56, ..., 0.91]
  <br></br>
  3 -------- [0.44, -1.02, ..., 0.33]
  <br></br>
          </span>
          <CodeSnippet language='PY' title="Applying Embeddings to the data">
            {`
            # Pocessing each batch
  for batch_num, (inputs, targets) in enumerate(dataLoader):
      # print(f"Processing Batch {batch_num+1}")
      token_encoding = token_encodingLayer(inputs) 
      input_embeddings = token_encoding + pos_encodings
  print(input_embeddings.shape)
  `}
          </CodeSnippet>
          <p><span className='highlight'>input_embeddings = token_encoding + pos_encodings</span> exactly does what is shown in image above.
          If the positional embedding for position 0 is <sapn className="highlight-grey">[0.12, -0.45, ..., 0.78]</sapn>, then this vector is added to the token embedding at position 0 
          in every sequence of the batch. Similarly, the positional embedding for position 1 is added to every token at position 1, and so on. The <span className='highlight-grey'>input_embeddings = token_encoding + pos_encodings</span> automatically adds each positional embedding with there input embeddings.
          </p>
        </TextSection>
        <SectionAnchor id="attention" />
        <TextSection level={2} title="Attention Mechanism" titleFont="montserrat" font="poppins">
          <ImageBlock src={attention} width="80%" caption="Where Attention sits in the GPT pipeline" />
          <p>
            The <span className="highlight">self-attention mechanism is the heart of every LLM</span>.
            Before transformers, recurrent neural networks (RNNs) dominated sequence tasks,
            but they processed tokens one at a time and struggled to connect words that were far apart in a sentence.
            Self-attention fixes this: every token can look at every other token in a single step, regardless of distance.
          </p>
          <ImageBlock src={whyattention} caption="Why word-by-word translation fails — attention solves the alignment problem" width="80%" />
          <Callout type="Note" title="The Core Idea">
            Self-attention asks three questions for each token: <span className="highlight">What am I looking for?</span> (Query),
            <span className="highlight"> What do I have to offer?</span> (Key), and
            <span className="highlight"> What do I actually share?</span> (Value).
            Matching queries to keys produces attention weights; those weights blend the values into a rich context vector.
          </Callout>
        </TextSection>
 
        {/* ── 3.1 Simplified Self-Attention ── */}
        <SectionAnchor id="simple-attention" />
        <TextSection level={3} title="Step 1 — Simplified Self-Attention (dot-product scores)" titleFont="montserrat" font="poppins">
          <ImageBlock src={simplifiedSelfAttention} caption="Simplified Self-Attention without involvement of learnable weights. This just works on the embeddings operations" width='80%'></ImageBlock>
          <p>
            The simplest form of self-attention skips learned weight matrices and works directly on the input embeddings.
            For a sequence of tokens <span className="code-line">x⁽¹⁾ … x⁽ᵀ⁾</span>, we want to compute a context vector for each token
            that summarises the whole sequence.
          </p>
          <p>
            The raw attention score between token <em>i</em> (the query) and token <em>j</em> (the key) is just their
            <span className="highlight"> dot product</span>:
          </p>
          <span className="code-line">ω_ij = x⁽ⁱ⁾ · x⁽ʲ⁾</span>
          <p>
            We then pass all scores for query <em>i</em> through <span className="highlight">softmax</span> to get
            normalised attention weights α that sum to 1. Finally, the context vector is the weighted sum of all input embeddings:
          </p>
          <span className="code-line">z⁽ⁱ⁾ = Σⱼ α_ij · x⁽ʲ⁾</span>
 
          <DiagramSection title="Compare how much each word is related to each word">
            <AttentionScoreDiagram />
          </DiagramSection>
 
          <DiagramSection title="">
            <AttentionWeightsDiagram />
          </DiagramSection>

          <p>The calculated <span className='highlight'>Attention Weights</span> are multiplied with there respective embedding vector and all are added to get <span className='highlight'>context vector</span> as shown in below image.</p>
          <ImageBlock src={attweightToContextVec} width='80%'></ImageBlock>
          <p>In the above image we have calculated the context vecotor for 2nd word "journy" and each word has it's own context vector.</p>
        </TextSection>
 
        {/* ── 3.2 Self-Attention with Trainable Weights (Q K V) ── */}
        <SectionAnchor id="qkv-attention" />
        <TextSection level={3} title="Step 2 — Self-Attention with Query, Key & Value Matrices" titleFont="montserrat" font="poppins">
          <ImageBlock src={qkv} caption="Figure 3.x — W_Q, W_K, W_V project each input into query, key, and value vectors" width="75%" />

          <p>
            Real LLMs don't compute attention directly on the raw embeddings. Instead, three learnable weight matrices —
            <span className="highlight"> W_Q, W_K, W_V</span> — project each embedding into separate query, key, and value spaces.
            This gives the model freedom to learn <em>what</em> to compare and <em>what</em> to pass forward.
          </p>
          {/* Swap the placeholder below for your actual qkv.png from the book */}
          <p>For each token <em>i</em>:</p>
          <span className="code-line">q⁽ⁱ⁾ = x⁽ⁱ⁾ · W_Q</span><br />
          <span className="code-line">k⁽ⁱ⁾ = x⁽ⁱ⁾ · W_K</span><br />
          <span className="code-line">v⁽ⁱ⁾ = x⁽ⁱ⁾ · W_V</span>
          <p>
            The scaled dot-product attention score between query <em>i</em> and key <em>j</em> is then divided by
            <span className="highlight"> √d_k</span> (the square root of the key dimension) before softmax.
            Scaling prevents the dot products from growing too large, which would push softmax into regions with tiny gradients:
          </p>
          <span className="code-line">attn_weight = softmax( (q⁽ⁱ⁾ · k⁽ʲ⁾) / √d_k )</span>

          <DiagramSection title="Working of Weighted Self Attention Mechanism">
            <QKVAttentionDiagram/>
          </DiagramSection>

          <CodeSnippet language="PY" title="Self-Attention forward pass (single head, no mask)">
            {`import torch
import torch.nn as nn
 
class SelfAttention(nn.Module):
    def __init__(self, d_in, d_out, qkv_bias=False):
        super().__init__()
        self.W_query = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_key   = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_value = nn.Linear(d_in, d_out, bias=qkv_bias)
 
    def forward(self, x):
        queries = self.W_query(x)          # (batch, T, d_out)
        keys    = self.W_key(x)
        values  = self.W_value(x)
 
        # Scaled dot-product scores
        attn_scores = queries @ keys.transpose(-2, -1)   # (batch, T, T)
        attn_scores = attn_scores / keys.shape[-1] ** 0.5
 
        attn_weights = torch.softmax(attn_scores, dim=-1)
 
        context_vecs = attn_weights @ values             # (batch, T, d_out)
        return context_vecs`}
          </CodeSnippet>
          <Callout type="math" title="Why divide by √d_k?">
            With high-dimensional embeddings the dot products can become very large, pushing softmax outputs close to 0 or 1.
            Dividing by <span className="highlight">√d_k</span> keeps the variance of the scores roughly at 1 regardless of embedding size,
            producing well-behaved gradients during training. This is the "scaled" part of scaled dot-product attention.
          </Callout>
        </TextSection>
 
        {/* ── 3.3 Causal (Masked) Self-Attention ── */}
        <SectionAnchor id="causal-attention" />
        <TextSection level={3} title="Step 3 — Causal Attention (masking future tokens)" titleFont="montserrat" font="poppins">
          <p>
            A GPT model generates text <span className="highlight">left to right</span> — it must not peek at words that haven't been generated yet.
            We enforce this by adding an <span className="highlight">upper-triangular causal mask</span> that sets future positions to −∞
            before softmax (which drives their weights to 0).
          </p>
          <ImageBlock src={causalMask} caption="The causal mask zeros out all attention to future tokens" width="75%" />
          <p>When attention masking is applied, the attention scores of the masked (future) tokens are set to −∞ before applying the softmax function. After softmax, these masked tokens receive an attention weight of 0, meaning they do not contribute to the context vector. The context vector is then computed as the weighted sum of the value vectors, using only the unmasked tokens with non-zero attention weights.</p>
          <CodeSnippet language="PY" title="CausalSelfAttention — the class from LLM.ipynb">
            {`class CasualSelfAttention(nn.Module):
    def __init__(self, d_in, d_out, context_length, dropout, qkv_bias=True):
        super().__init__()
        self.d_out    = d_out
        self.W_query  = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_key    = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_value  = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.dropout  = nn.Dropout(dropout)
 
        # Upper-triangular mask (1 = must be masked)
        # register_buffer → saved with the model but NOT a learnable parameter
        self.register_buffer(
            "mask",
            torch.triu(torch.ones(context_length, context_length), diagonal=1)
        )
 
    def forward(self, x):
        b, num_token, d_in = x.shape
        keys    = self.W_key(x)
        queries = self.W_query(x)
        values  = self.W_value(x)
 
        attn_scores = queries @ keys.transpose(1, 2)
 
        # Replace future positions with -inf before softmax
        attn_scores = attn_scores.masked_fill(
            self.mask[:num_token, :num_token] == 1, float("-inf")
        )
 
        # Scale + softmax → attention weights
        attn_weights = torch.softmax(attn_scores / keys.shape[-1] ** 0.5, dim=-1)
        attn_weights = self.dropout(attn_weights)
 
        context_vec = attn_weights @ values   # (b, num_token, d_out)
        return context_vec`}
          </CodeSnippet>
          <p>
            The <span className="highlight-grey">register_buffer</span> call stores the mask as part of the model state
            (so it moves to GPU with <span className="code-line">.to(device)</span>) but it is <em>not</em> trained.
            After masking, <span className="highlight">masked_fill</span> replaces 1-entries with −∞;
            softmax converts those to exactly 0, so the model truly cannot see future tokens.
          </p>
          <CodeSnippet language="PY" title="Using CausalSelfAttention">
            {`context_length = 4
ca = CasualSelfAttention(d_in=256, d_out=2, context_length=context_length, dropout=0.1)
context_vec = ca(input_embeddings)
print(context_vec.shape)
# torch.Size([8, 4, 2])
# 8 sentences × 4 tokens × 2-dim output per token`}
          </CodeSnippet>
          <OutputBlock>
            {`torch.Size([8, 4, 2])
 
Each of the 8 sentences of a batch now has 4 tokens, and each token has been compressed 
into a 2-dimensional context vector that fuses information from all previous (and current) tokens.`}
          </OutputBlock>

          <br></br>
          <p>So far we had took the word then converted it into token further this token got converted to n-dimensional embedding which was added with the positional embedding and then this embedding was used to calculate the Query, Key and Value of it which were used to calculate the 
            Attention Score which on Normalization give Attention Weights which were then multiplied with respective embedding and sum up to get a Context Vecor. So as of now that word is represented as Context Vector which has more information about it's surrounding rather than just static meaning. </p>
          <Callout type="tip" title="What does Dropout do here?">
            Dropout on the attention weights randomly zeroes out some token–token connections during training.
            This prevents the model from becoming over-reliant on any single attention pattern and reduces overfitting —
            it acts as a regulariser specifically for the attention distribution.
          </Callout>
        </TextSection>
 
        {/* ── 3.4 Multi-Head Attention (Wrapper) ── */}
        <SectionAnchor id="multihead-attention" />
        <TextSection level={3} title="Step 4 — Multi-Head Attention" titleFont="montserrat" font="poppins">
          <p>
            A single attention head can only learn one type of relationship between tokens at a time.
            <span className="highlight"> Multi-head attention</span> runs several independent heads in parallel,
            each free to focus on a different aspect (syntax, coreference, position, etc.), then concatenates their outputs.
          </p>
 
          <h3 style={{ fontFamily: 'poppins' }}>Version A — Sequential Wrapper</h3>
          <ImageBlock src={sequentialWrapper} width='80%'></ImageBlock>
          <p>
            The simplest implementation stacks <span className="highlight-grey">num_heads</span> independent
            <span className="highlight-grey"> CausalSelfAttention</span> modules and concatenates their outputs.
            Easy to understand, but computationally wasteful because each head performs its own separate matrix multiplications.
          </p>
          <p>In the above image the multi-head attention module includes two single-head attention modules stacked on top of
            each other. So, instead of using a single matrix Wv for computing the value matrices, in a multi-head attention
            module with two heads, we now have two value weight matrices: Wv1 and Wv2. The same applies to the other
            weight matrices, WQ and Wk. We obtain two sets of context vectors Z1 and Z2 that we can combine into a single
            context vector matrix Z.
          </p>
          <CodeSnippet language="PY" title="MultiHeadAttentionWrapper — simple but sequential">
            {`class MultiHeadAttentionWrapper(nn.Module):
    def __init__(self, d_in, d_out, context_length, dropout, num_heads, qkv_bias=False):
        super().__init__()
        # One independent attention head per slot in the list
        self.heads = nn.ModuleList([
            CasualSelfAttention(d_in=d_in, d_out=d_out,
                                context_length=context_length, dropout=dropout)
            for _ in range(num_heads)
        ])
 
    def forward(self, x):
        # Run heads sequentially, concatenate along the token dimension
        return torch.cat([head(x) for head in self.heads], dim=-1)
 
# Example: 2 heads, each producing d_out=2 → total output dim = 4
mhaw = MultiHeadAttentionWrapper(d_in=256, d_out=2,
                                  context_length=context_length,
                                  dropout=0.1, num_heads=2)
context_v = mhaw(input_embeddings)
print(context_v.shape)   # torch.Size([8, 4, 4])`}
          </CodeSnippet>
 
          <h3 style={{ fontFamily: 'poppins' }}>Version B — Efficient Parallel Multi-Head Attention</h3>
          <ImageBlock src={parallelMultiHead} width='80%'></ImageBlock>
          <p>
            The production approach fuses all heads into a <span className="highlight">single set of W_Q, W_K, W_V matrices</span>,
            performs one big matrix multiplication, then <span className="highlight">splits, transposes, and processes all heads in parallel</span>.
            This is what GPT-2 and all modern transformers actually use.
          </p>
          {/* <ImageBlock src={multiheadParallel} caption="Figure 3.26 — One Wq multiplication + split vs. separate multiplications per head" width="80%" /> */}
          <CodeSnippet language="PY" title="MulticlassAttention — efficient parallel version from LLM.ipynb">
            {`class MulticlassAttention(nn.Module):
    def __init__(self, d_in, d_out, context_length, dropout, num_heads, qkv_bias=False):
        super().__init__()
        assert d_out % num_heads == 0, "d_out must be divisible by num_heads"
 
        self.d_out     = d_out
        self.num_heads = num_heads
        self.head_dim  = d_out // num_heads   # dimension per head
 
        # Single large projection for all heads at once
        self.W_query = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_key   = nn.Linear(d_in, d_out, bias=qkv_bias)
        self.W_value = nn.Linear(d_in, d_out, bias=qkv_bias)
 
        self.out_proj = nn.Linear(d_out, d_out)   # combines head outputs
        self.dropout  = nn.Dropout(dropout)
 
        self.register_buffer(
            "mask",
            torch.triu(torch.ones(context_length, context_length), diagonal=1)
        )
 
    def forward(self, x):
        b, num_token, d_in = x.shape
 
        # Project to Q, K, V  (b, T, d_out)
        query = self.W_query(x)
        keys  = self.W_key(x)
        value = self.W_value(x)
 
        # Split d_out into num_heads × head_dim, move heads to dim 1
        # Shape becomes (b, num_heads, T, head_dim)
        query = query.view(b, num_token, self.num_heads, self.head_dim).transpose(1, 2)
        keys  = keys .view(b, num_token, self.num_heads, self.head_dim).transpose(1, 2)
        value = value.view(b, num_token, self.num_heads, self.head_dim).transpose(1, 2)
 
        # Scaled dot-product for all heads in one batched matmul
        attn_scores = query @ keys.transpose(2, 3)   # (b, heads, T, T)
 
        # Apply causal mask
        mask = self.mask[:num_token, :num_token]
        attn_scores = attn_scores.masked_fill(mask.bool(), float("-inf"))
 
        attn_weights = torch.softmax(attn_scores / self.head_dim ** 0.5, dim=-1)
        attn_weights = self.dropout(attn_weights)
 
        # Weighted sum over values → (b, heads, T, head_dim)
        context_vec = attn_weights @ value
 
        # Merge heads back: transpose → (b, T, heads, head_dim) → (b, T, d_out)
        context_vec = context_vec.transpose(1, 2).contiguous().view(b, num_token, self.d_out)
 
        # Final linear projection
        context_vec = self.out_proj(context_vec)
        return context_vec`}
          </CodeSnippet>
          <OutputBlock>
            {`# For GPT-2 smallest model (12 heads, d_out=768, context=1024):
mha = MulticlassAttention(d_in=768, d_out=768,
                           context_length=1024, dropout=0.1, num_heads=12)
# Output shape: (batch, tokens, 768)
# Each of the 12 heads focuses on a different 64-dim subspace (768 / 12 = 64)`}
          </OutputBlock>
          
          <h3>Understand how the shapes changes and how the Input Embedding are passed through multiple head and converted into Context Vector.</h3>
          <ImageBlock src={shapeChanging} width='80%'></ImageBlock>


          <Callout type="math" title="Why does splitting work?">
            After the single W_Q matrix multiplication we have a tensor of shape
            <span className="code-line"> (batch, T, d_out)</span>.
            Reshaping it to <span className="code-line">(batch, T, num_heads, head_dim)</span> and transposing to
            <span className="code-line">(batch, num_heads, T, head_dim)</span> is mathematically equivalent to running
            <span className="highlight"> num_heads independent smaller attention layers</span>, but with only one matrix multiply instead of num_heads.
            PyTorch's batched matmul then handles all heads simultaneously.
          </Callout>
        </TextSection>
 
        {/* ── 3.5 GPT-2 Scale ── */}
        <SectionAnchor id="gpt2-attention" />
        <TextSection level={3} title="Putting It Together — GPT-2 Scale" titleFont="montserrat" font="poppins">
          <p>
            With the attention module ready, we can wire it up exactly as the smallest GPT-2 architecture specifies:
            <span className="highlight"> 12 attention heads</span>, an embedding dimension of
            <span className="highlight"> 768</span>, and a context window of
            <span className="highlight"> 1,024 tokens</span>.
          </p>
          <CodeSnippet language="PY" title="Preparing GPT-2 scale inputs and running attention">
            {`# Step 1 — Tokenise and create batches of context length 1024
with open('verdict.txt', 'r') as file:
    corpus = file.read().strip()
 
data_loader = create_dataloader(corpus, batch_size=8,
                                max_length=1024, stride=1024, shuffle=False)
 
# Step 2 — Embedding layers  (vocab → 768-dim, position → 768-dim)
TokenEmbeddingLayer     = nn.Embedding(50257, 768)
PositionalEmbeddingLayer = nn.Embedding(1024, 768)
positional_encodings     = PositionalEmbeddingLayer(torch.arange(1024))
 
for batch_num, (inputs, targets) in enumerate(data_loader):
    Token_embeddings  = TokenEmbeddingLayer(inputs)           # (8, 1024, 768)
    Input_embeddings  = Token_embeddings + positional_encodings  # (8, 1024, 768)
 
# Step 3 — Multi-head attention
mha = MulticlassAttention(d_in=768, d_out=768,
                           context_length=1024, dropout=0.1, num_heads=12)
context_vector = mha(Input_embeddings)
print(context_vector.shape)   # torch.Size([8, 1024, 768])`}
          </CodeSnippet>
          <OutputBlock>
            {`torch.Size([8, 1024, 768])
 
8 batches  ×  1024 tokens  ×  768-dimensional context vector per token.
Each context vector now encodes information from all previous tokens in the window,
weighted by the 12-head attention mechanism — exactly what GPT-2 uses.`}
          </OutputBlock>
          
          <h3>Understanding change of Input Embeddings in Multi-Head Attention</h3>
 
          <Callout type="Note" title="GPT-2 Attention at a Glance">
            <p>GPT-2 Small (117 M parameters): <span className="highlight">12 heads × 64 head_dim = 768 d_out</span>, context = 1,024 tokens.</p>
            <p>GPT-2 XL (1.5 B parameters): <span className="highlight">25 heads × 64 head_dim = 1,600 d_out</span>, context = 1,024 tokens.</p>
            <p>The <span className="highlight">d_in always equals d_out</span> in GPT models so the output can be fed directly into the next transformer block.</p>
          </Callout>
        </TextSection>

        {/* ── Summary ── */}
        <SectionAnchor id="attention-summary" />
        <TextSection level={3} title="Attention Mechanism — Summary" titleFont="montserrat" font="poppins">
          <p>Here is the complete journey from raw embeddings to multi-head context vectors:</p>
          <p>
            <span className="highlight-purple">1. Simplified attention</span> — dot product of raw embeddings → softmax → weighted sum.
            Intuitive but not learnable.
          </p>
          <p>
            <span className="highlight-purple">2. Q K V attention</span> — three learnable matrices project inputs into query, key, and value spaces.
            Scores are scaled by √d_k before softmax.
          </p>
          <p>
            <span className="highlight-purple">3. Causal masking</span> — upper-triangular −∞ mask prevents the model from seeing future tokens,
            enforcing autoregressive (left-to-right) generation.
          </p>
          <p>
            <span className="highlight-purple">4. Dropout on attention weights</span> — regularises the attention distribution during training.
          </p>
          <p>
            <span className="highlight-purple">5. Multi-head attention</span> — parallel independent heads each learn different token relationships;
            efficient implementation uses one large matrix multiply + reshape instead of separate per-head multiplications.
          </p>
          <Callout type="tip" title="Next: The Transformer Block">
            The attention module is just one piece. In the next section we will wrap it inside a
            <span className="highlight"> Transformer Block</span> that adds Layer Normalisation, a Feed-Forward network
            (with GELU activation), shortcut connections, and dropout — the full GPT-2 building block that gets stacked 12 times.
          </Callout>
        </TextSection>

        <SectionAnchor id="gpt-model" />
        <TextSection level={1} title="Building the GPT Model" titleFont="montserrat" font="poppins">
          <p>
            Now that the attention mechanism is ready, we assemble the full GPT model step by step.
            Think of it like building a skyscraper — each floor is a Transformer Block, and every block
            is built from smaller rooms: Layer Normalisation, a Feed Forward network, and the Multi-Head
            Attention we already coded.
          </p>
        </TextSection>
 
        {/* ── Layer Normalisation ── */}
        <SectionAnchor id="layer-norm" />
        <TextSection level={2} title="Layer Normalisation" titleFont="montserrat" font="poppins">
          <p>
            Deep networks suffer from <span className="highlight">vanishing/exploding gradients</span> — numbers
            that shrink to zero or blow up as they pass through many layers, making training unreliable.
            Layer Normalisation fixes this by rescaling the activations inside every layer so they always
            have a <span className="highlight">mean of 0 and variance of 1</span>, keeping numbers in a
            healthy range regardless of how deep the network is.
          </p>
          <Callout type="math" title="The formula">
            x_norm = (x − mean) / √(variance + ε) &nbsp;&nbsp; then scale and shift with learnable parameters
          </Callout>
          <CodeSnippet language="PY" title="LayerNorm class">
{`class LayerNorm(nn.Module):
    def __init__(self, emb_dim):
        super().__init__()
        self.eps   = 1e-5                              # prevents division by zero
        self.scale = nn.Parameter(torch.ones(emb_dim))  # learnable  (starts at 1)
        self.shift = nn.Parameter(torch.zeros(emb_dim)) # learnable  (starts at 0)
 
    def forward(self, x):
        mean  = x.mean(dim=-1, keepdim=True)
        var   = x.var(dim=-1,  keepdim=True, unbiased=False)
        x_norm = (x - mean) / torch.sqrt(var + self.eps)
        return self.scale * x_norm + self.shift`}
          </CodeSnippet>
          <p>
            The <span className="highlight-grey">scale</span> and <span className="highlight-grey">shift</span> parameters
            let the model undo the normalisation if needed — they are learned during training.
            Without them, every layer would always output the same distribution, reducing expressiveness.
          </p>
        </TextSection>
 
        {/* ── GELU Activation ── */}
        <SectionAnchor id="gelu" />
        <TextSection level={2} title="GELU Activation Function" titleFont="montserrat" font="poppins">
          <p>
            Activation functions add <span className="highlight">non-linearity</span> — without them,
            stacking many layers is mathematically equivalent to just one layer.
            GPT uses <span className="highlight">GELU</span> (Gaussian Error Linear Unit) instead of the classic ReLU.
          </p>
          <p>
            The key difference: ReLU hard-zeroes any negative input.
            GELU allows a <span className="highlight">small negative output</span> for slightly negative inputs,
            which means neurons that receive negative values can still contribute to learning,
            producing smoother and more stable gradients during training.
          </p>
          <CodeSnippet language="PY" title="GELU class">
{`class GELU(nn.Module):
    def __init__(self):
        super().__init__()
 
    def forward(self, x):
        # Approximation used in GPT-2 (matches OpenAI's original implementation)
        return 0.5 * x * (1 + torch.tanh(
            torch.sqrt(torch.tensor(2.0 / torch.pi)) * (x + 0.044715 * torch.pow(x, 3))
        ))`}
          </CodeSnippet>
          <Callout type="tip" title="Why not ReLU?">
            ReLU sets all negative inputs to exactly 0, which can "kill" neurons permanently during training.
            GELU's smooth curve near zero avoids this, leading to better performance in large language models.
            GPT-2, GPT-3, and most modern LLMs all use GELU.
          </Callout>
        </TextSection>
 
        {/* ── Feed Forward Network ── */}
        <SectionAnchor id="feedforward" />
        <TextSection level={2} title="Feed Forward Network" titleFont="montserrat" font="poppins">
          <p>
            After the attention layer has figured out <em>which</em> tokens to pay attention to,
            the Feed Forward Network (FFN) processes each token <span className="highlight">independently</span> to
            transform what it learned. It's like a per-token "thinking" step.
          </p>
          <p>
            The FFN first <span className="highlight">expands</span> the embedding dimension by 4× (768 → 3072),
            applies GELU, then <span className="highlight">contracts</span> it back (3072 → 768).
            This expansion-then-compression lets the network explore a much richer space of representations
            before settling on the final output.
          </p>
          <CodeSnippet language="PY" title="FeedForward class">
{`class FeedForward(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(cfg["emb_dim"], 4 * cfg["emb_dim"]),  # expand  768 → 3072
            GELU(),                                           # non-linearity
            nn.Linear(4 * cfg["emb_dim"], cfg["emb_dim"]),  # contract 3072 → 768
        )
 
    def forward(self, x):
        return self.layers(x)
 
# Input shape:  (batch, tokens, 768)
# Output shape: (batch, tokens, 768)  — same shape in, same shape out`}
          </CodeSnippet>
        </TextSection>
 
        {/* ── Transformer Block ── */}
        <SectionAnchor id="transformer-block" />
        <TextSection level={2} title="The Transformer Block" titleFont="montserrat" font="poppins">
          <p>
            One Transformer Block combines everything built so far.
            The diagram below shows exactly what happens to the data as it flows through one block.
            The key insight: <span className="highlight">shortcut connections</span> (also called residual connections)
            add the block's input directly to its output, creating a "highway" that lets gradients
            flow backwards through dozens of layers without vanishing.
          </p>
          <DiagramSection title="Inside one Transformer Block" caption="Data flows top to bottom. Shortcut connections bypass each sub-layer to preserve gradient flow.">
            <div style={{ overflowX: 'auto' }}>
              <svg width="100%" viewBox="0 0 680 520" role="img">
                <title>Transformer Block data flow diagram</title>
                <desc>Input passes through LayerNorm, then Multi-Head Attention, adds a shortcut, then LayerNorm again, then FeedForward, adds another shortcut, producing the output.</desc>
                <defs>
                  <marker id="arr-tb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>
 
                {/* Input box */}
                <g>
                  <rect x="220" y="20" width="240" height="44" rx="8" className="box" strokeWidth="0.5"/>
                  <text className="th" x="340" y="42" textAnchor="middle" dominantBaseline="central">Input x  (batch, T, 768)</text>
                </g>
 
                {/* Arrow down */}
                <line x1="340" y1="64" x2="340" y2="104" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
 
                {/* LayerNorm 1 */}
                <g>
                  <rect x="220" y="104" width="240" height="44" rx="8" className="c-teal" strokeWidth="0.5"/>
                  <text className="th" x="340" y="126" textAnchor="middle" dominantBaseline="central">Layer Norm 1</text>
                </g>
 
                <line x1="340" y1="148" x2="340" y2="188" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
 
                {/* Multi-Head Attention */}
                <g>
                  <rect x="180" y="188" width="320" height="56" rx="8" className="c-purple" strokeWidth="0.5"/>
                  <text className="th" x="340" y="210" textAnchor="middle" dominantBaseline="central">Multi-Head Causal Attention</text>
                  <text className="ts" x="340" y="230" textAnchor="middle" dominantBaseline="central">12 heads × 64 dim = 768 out</text>
                </g>
 
                <line x1="340" y1="244" x2="340" y2="270" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
 
                {/* Dropout */}
                <g>
                  <rect x="260" y="270" width="160" height="38" rx="8" className="c-gray" strokeWidth="0.5"/>
                  <text className="ts" x="340" y="289" textAnchor="middle" dominantBaseline="central">Dropout (10%)</text>
                </g>
 
                {/* Shortcut 1 label + curved arrow */}
                <text className="ts" x="90" y="170" textAnchor="middle" fill="var(--text-secondary)">Shortcut</text>
                <path d="M220 126 L100 126 L100 330 L220 330" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-tb)"/>
 
                {/* Add shortcut */}
                <line x1="340" y1="308" x2="340" y2="330" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
                <g>
                  <circle cx="340" cy="340" r="16" className="c-coral" strokeWidth="0.5"/>
                  <text className="th" x="340" y="340" textAnchor="middle" dominantBaseline="central">+</text>
                </g>
 
                <line x1="340" y1="356" x2="340" y2="378" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
 
                {/* LayerNorm 2 */}
                <g>
                  <rect x="220" y="378" width="240" height="44" rx="8" className="c-teal" strokeWidth="0.5"/>
                  <text className="th" x="340" y="400" textAnchor="middle" dominantBaseline="central">Layer Norm 2</text>
                </g>
 
                <line x1="340" y1="422" x2="340" y2="456" className="arr" markerEnd="url(#arr-tb)" stroke="var(--border-strong)"/>
 
                {/* FeedForward */}
                <g>
                  <rect x="200" y="456" width="280" height="44" rx="8" className="c-amber" strokeWidth="0.5"/>
                  <text className="th" x="340" y="478" textAnchor="middle" dominantBaseline="central">Feed Forward (768→3072→768)</text>
                </g>
 
                {/* Shortcut 2 label */}
                <text className="ts" x="590" y="415" textAnchor="middle" fill="var(--text-secondary)">Shortcut</text>
                <path d="M460 400 L580 400 L580 510 L460 510" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="4 3" markerEnd="url(#arr-tb)"/>
 
                {/* Output label (implied, at bottom) */}
                <text className="ts" x="340" y="514" textAnchor="middle" fill="var(--text-secondary)">→ Output (batch, T, 768) — same shape</text>
              </svg>
            </div>
          </DiagramSection>
          <CodeSnippet language="PY" title="TransformerBlock class">
{`class TransformerBlock(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        self.att  = MulticlassAttention(d_in=cfg["emb_dim"], d_out=cfg["emb_dim"],
                                        context_length=cfg["context_length"],
                                        num_heads=cfg["n_heads"], dropout=cfg["drop_rate"],
                                        qkv_bias=cfg["qkv_bias"])
        self.ff   = FeedForward(cfg)
        self.norm1 = LayerNorm(cfg["emb_dim"])
        self.norm2 = LayerNorm(cfg["emb_dim"])
        self.drop_shortcut = nn.Dropout(cfg["drop_rate"])
 
    def forward(self, x):
        # ── Attention sub-layer ──────────────────────────────────────
        shortcut = x               # save input for the shortcut
        x = self.norm1(x)          # normalise BEFORE attention (Pre-LayerNorm)
        x = self.att(x)            # multi-head causal attention
        x = self.drop_shortcut(x)  # dropout for regularisation
        x = x + shortcut           # ← shortcut connection (add original input back)
 
        # ── Feed-forward sub-layer ───────────────────────────────────
        shortcut = x
        x = self.norm2(x)
        x = self.ff(x)
        x = self.drop_shortcut(x)
        x = x + shortcut           # ← second shortcut connection
 
        return x                   # shape unchanged: (batch, T, emb_dim)`}
          </CodeSnippet>
          <CodeSnippet language="PY" title="Testing with dummy input">
{`torch.manual_seed(123)
dummy_input = torch.rand(8, 4, 768)        # 8 batches, 4 tokens, 768-dim embedding
trf_block = TransformerBlock(GPT_CONFIG_124M)
output = trf_block(dummy_input)
print(dummy_input.shape)   # torch.Size([8, 4, 768])
print(output.shape)        # torch.Size([8, 4, 768])  — shape preserved!`}
          </CodeSnippet>
          <OutputBlock>
{`torch.Size([8, 4, 768])
torch.Size([8, 4, 768])
 
The Transformer Block preserves the tensor shape.
This is intentional — it allows stacking 12 identical blocks without any dimension changes.`}
          </OutputBlock>
        </TextSection>
 
        {/* ── Full GPT Model ── */}
        <SectionAnchor id="full-gpt" />
        <TextSection level={2} title="Assembling the Full GPT Model" titleFont="montserrat" font="poppins">
          <p>
            With the Transformer Block ready, assembling the full GPT model is straightforward.
            The model is just: embeddings → 12 Transformer Blocks → Layer Norm → output projection.
          </p>
          <CodeSnippet language="PY" title="GPT-2 config and full model">
{`GPT_CONFIG_124M = {
    "vocab_size"     : 50257,   # how many tokens the model knows
    "context_length" : 1024,    # max tokens the model can read at once
    "emb_dim"        : 768,     # embedding dimension per token
    "n_heads"        : 12,      # attention heads per block
    "n_layers"       : 12,      # how many Transformer Blocks to stack
    "drop_rate"      : 0.1,     # dropout probability
    "qkv_bias"       : False    # no bias in Q/K/V projections
}
 
class DummyGPTModel(nn.Module):
    def __init__(self, cfg):
        super().__init__()
        # Step 1: convert token IDs → 768-dim vectors
        self.tok_emb  = nn.Embedding(cfg["vocab_size"], cfg["emb_dim"])
        # Step 2: add positional information
        self.pos_emb  = nn.Embedding(cfg["context_length"], cfg["emb_dim"])
        self.dropout  = nn.Dropout(cfg["drop_rate"])
        # Step 3: 12 Transformer Blocks in sequence
        self.trf_blocks = nn.Sequential(
            *[TransformerBlock(cfg) for _ in range(cfg["n_layers"])]
        )
        # Step 4: final normalisation
        self.final_norm = LayerNorm(cfg["emb_dim"])
        # Step 5: project from 768-dim back to vocabulary size (50257)
        # so we can pick the most likely next token
        self.out_head = nn.Linear(cfg["emb_dim"], cfg["vocab_size"], bias=False)
 
    def forward(self, in_idx):
        batch_size, seq_len = in_idx.shape
        tok_emb  = self.tok_emb(in_idx)
        pos_emb  = self.pos_emb(torch.arange(seq_len, device=in_idx.device))
        x = tok_emb + pos_emb       # combined embedding: token meaning + position
        x = self.dropout(x)
        x = self.trf_blocks(x)      # pass through all 12 blocks
        x = self.final_norm(x)
        logits = self.out_head(x)   # shape: (batch, seq_len, 50257)
        return logits`}
          </CodeSnippet>
          <CodeSnippet language="PY" title="Run the model on two sentences">
{`batch = []
txt1 = "Every effort moves you"
txt2 = "Every day holds a"
 
batch.append(torch.tensor(tokenizer.encode(txt1)))
batch.append(torch.tensor(tokenizer.encode(txt2)))
batch = torch.stack(batch)
 
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model  = DummyGPTModel(GPT_CONFIG_124M).to(device)
logits = model(batch.to(device))
print(logits.shape)`}
          </CodeSnippet>
          <OutputBlock>
{`torch.Size([2, 4, 50257])
 
2 sentences × 4 tokens × 50257 vocabulary scores.
Each of the 50,257 numbers is the model's "confidence" that
the corresponding word comes next. The highest one wins.`}
          </OutputBlock>
          <Callout type="Note" title="Parameter count">
            <p>The full GPT-2 124M model has <span className="highlight">163 million parameters</span> (not 124M) because weight tying between the token embedding and output layer is not applied in our implementation. Counting storage at 4 bytes per float: <span className="highlight">≈ 621 MB</span> on disk.</p>
            <CodeSnippet language="PY" title="">
{`total = sum(p.numel() for p in model.parameters())
print(f"{total:,} parameters")                # 163,009,536
print(f"{total * 4 / 1024**2:.1f} MB")        # 621.8 MB`}
            </CodeSnippet>
          </Callout>
        </TextSection>
 
        {/* ════════════════════════════════════════════════════════════════
            SECTION: TEXT GENERATION
        ════════════════════════════════════════════════════════════════ */}
 
        <SectionAnchor id="text-generation" />
        <TextSection level={1} title="Generating Text" titleFont="montserrat" font="poppins">
          <p>
            The model outputs <span className="highlight">logits</span> — one number per vocabulary word per position.
            To turn those logits into actual text, we pick the next token, append it to the input, and repeat.
            This one-token-at-a-time loop is called <span className="highlight">autoregressive generation</span>.
          </p>
        </TextSection>
 
        <SectionAnchor id="simple-generation" />
        <TextSection level={2} title="Simple Text Generation (greedy)" titleFont="montserrat" font="poppins">
          <p>
            The simplest strategy: at each step, just pick whichever token has the highest probability.
            This is called <span className="highlight">greedy decoding</span>.
          </p>
          <DiagramSection title="Autoregressive generation loop" caption="Each generated token is appended back to the input before the next step.">
            <div style={{ overflowX: 'auto' }}>
              <svg width="100%" viewBox="0 0 680 300" role="img">
                <title>Autoregressive text generation loop</title>
                <desc>Input tokens go into the GPT model, the last logit is taken, softmax is applied, the top token is picked, then it is appended to the input for the next iteration.</desc>
                <defs>
                  <marker id="arr-gen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>
 
                {/* Step boxes */}
                <g className="c-gray">
                  <rect x="20" y="110" width="130" height="56" rx="8" strokeWidth="0.5"/>
                  <text className="th" x="85" y="130" textAnchor="middle" dominantBaseline="central">Input tokens</text>
                  <text className="ts" x="85" y="150" textAnchor="middle" dominantBaseline="central">"Hello, I am"</text>
                </g>
 
                <line x1="150" y1="138" x2="178" y2="138" className="arr" markerEnd="url(#arr-gen)" stroke="var(--border-strong)"/>
 
                <g className="c-purple">
                  <rect x="178" y="110" width="120" height="56" rx="8" strokeWidth="0.5"/>
                  <text className="th" x="238" y="130" textAnchor="middle" dominantBaseline="central">GPT Model</text>
                  <text className="ts" x="238" y="150" textAnchor="middle" dominantBaseline="central">12 transformer blocks</text>
                </g>
 
                <line x1="298" y1="138" x2="326" y2="138" className="arr" markerEnd="url(#arr-gen)" stroke="var(--border-strong)"/>
 
                <g className="c-teal">
                  <rect x="326" y="110" width="110" height="56" rx="8" strokeWidth="0.5"/>
                  <text className="th" x="381" y="130" textAnchor="middle" dominantBaseline="central">Last logit</text>
                  <text className="ts" x="381" y="150" textAnchor="middle" dominantBaseline="central">→ softmax</text>
                </g>
 
                <line x1="436" y1="138" x2="464" y2="138" className="arr" markerEnd="url(#arr-gen)" stroke="var(--border-strong)"/>
 
                <g className="c-amber">
                  <rect x="464" y="110" width="110" height="56" rx="8" strokeWidth="0.5"/>
                  <text className="th" x="519" y="130" textAnchor="middle" dominantBaseline="central">Pick top token</text>
                  <text className="ts" x="519" y="150" textAnchor="middle" dominantBaseline="central">"a"  →  append</text>
                </g>
 
                {/* Feedback arrow below */}
                <path d="M519 166 L519 240 L85 240 L85 166" fill="none" stroke="var(--border-strong)" strokeWidth="1" strokeDasharray="5 4" markerEnd="url(#arr-gen)"/>
                <text className="ts" x="302" y="258" textAnchor="middle" fill="var(--text-secondary)">append token → repeat until max_new_tokens reached</text>
 
                {/* Result */}
                <text className="ts" x="340" y="50" textAnchor="middle" fill="var(--text-secondary)">After 3 iterations: "Hello, I am a model ready"</text>
              </svg>
            </div>
          </DiagramSection>
          <CodeSnippet language="PY" title="generate_text_simple — greedy decoding">
{`def generate_text_simple(model, idx, max_new_tokens, context_size):
    for _ in range(max_new_tokens):
        # only feed the last context_size tokens (avoids exceeding max length)
        idx_cond = idx[:, -context_size:]
 
        with torch.no_grad():           # no gradient needed for inference
            logits = model(idx_cond)    # (batch, T, 50257)
 
        logits = logits[:, -1, :]       # only care about the LAST token's prediction
 
        probas    = torch.softmax(logits, dim=-1)        # convert to probabilities
        idx_next  = torch.multinomial(probas, num_samples=1)  # sample from distribution
 
        idx = torch.cat((idx, idx_next), dim=1)         # append predicted token
    return idx
 
# Try it out
start_context    = "Hello, I am"
encoded          = tokenizer.encode(start_context)
encoded_tensor   = torch.tensor(encoded).unsqueeze(0).to(device)
 
model.eval()
out          = generate_text_simple(model, idx=encoded_tensor,
                                    max_new_tokens=10,
                                    context_size=GPT_CONFIG_124M["context_length"])
decoded_text = tokenizer.decode(out.squeeze(0).tolist())
print(decoded_text)`}
          </CodeSnippet>
          <OutputBlock>
{`Hello, I am Eks Comple Fif practical unfortunatelyImages Concept unfortunatelyImages Concept
 
⚠ The output is gibberish because the model is freshly initialised with random weights.
After training, it will generate coherent text instead.`}
          </OutputBlock>
        </TextSection>
 
        {/* ════════════════════════════════════════════════════════════════
            SECTION: TRAINING
        ════════════════════════════════════════════════════════════════ */}
 
        <SectionAnchor id="training" />
        <TextSection level={1} title="Training the Model" titleFont="montserrat" font="poppins">
          <p>
            Training teaches the model to predict the next token correctly by repeatedly measuring how wrong it is
            (the <span className="highlight">loss</span>) and nudging its weights in the direction that reduces that error.
            This process is called <span className="highlight">backpropagation + gradient descent</span>.
          </p>
        </TextSection>
 
        <SectionAnchor id="loss" />
        <TextSection level={2} title="The Loss Function" titleFont="montserrat" font="poppins">
          <p>
            We use <span className="highlight">Cross-Entropy Loss</span>.
            For each token position, the model produces 50,257 probability scores.
            Cross-entropy measures how much probability the model assigned to the <em>correct</em> next token
            — the higher that probability, the lower the loss.
          </p>
          <CodeSnippet language="PY" title="Loss functions">
{`# Loss for a single batch
def calc_loss_batch(input_batch, target_batch, model, device):
    input_batch  = input_batch.to(device)
    target_batch = target_batch.to(device)
    logits = model(input_batch)                            # (batch, T, 50257)
    # flatten batch and time dims so cross_entropy sees (batch*T, 50257) vs (batch*T,)
    loss = torch.nn.functional.cross_entropy(
        logits.flatten(0, 1),   # predicted scores
        target_batch.flatten()  # true next-token IDs
    )
    return loss
 
# Average loss across many batches (for evaluation)
def calc_loss_loader(data_loader, model, device, num_batches=None):
    total_loss = 0
    num_batches = num_batches or len(data_loader)
    num_batches = min(num_batches, len(data_loader))
    for i, (input_batch, target_batch) in enumerate(data_loader):
        if i >= num_batches:
            break
        loss = calc_loss_batch(input_batch, target_batch, model, device)
        total_loss += loss.item()
    return total_loss / num_batches`}
          </CodeSnippet>
        </TextSection>
 
        <SectionAnchor id="train-loop" />
        <TextSection level={2} title="The Training Loop" titleFont="montserrat" font="poppins">
          <p>
            The training loop repeats for many epochs: feed a batch in, compute the loss,
            backpropagate to get gradients, then take an optimizer step to update the weights.
            We use <span className="highlight">AdamW</span> — an improved version of the Adam optimizer
            that adds weight decay to prevent overfitting.
          </p>
          <Callout type="Note" title="Training setup — smaller config for speed">
            For demonstration the notebook uses a smaller model config
            (context=256, emb_dim=256, 4 heads, 4 layers) trained on a small stories dataset,
            so it finishes in minutes instead of days.
          </Callout>
          <CodeSnippet language="PY" title="Training and evaluation functions">
{`def train_model_simple(model, train_loader, val_loader, optimizer, device,
                        num_epochs, eval_freq, eval_iter, start_context, tokenizer):
    train_losses, val_losses, tokens_seen = [], [], []
    global_step = 0
 
    for epoch in range(num_epochs):
        model.train()                               # ← puts model in training mode
 
        for input_batch, target_batch in train_loader:
            optimizer.zero_grad()                   # clear previous gradients
            loss = calc_loss_batch(input_batch, target_batch, model, device)
            loss.backward()                         # compute gradients (backprop)
            optimizer.step()                        # update weights
            global_step += 1
 
            # Every eval_freq steps, check progress
            if global_step % eval_freq == 0:
                train_loss, val_loss = evaluate_model(
                    model, train_loader, val_loader, device, eval_iter
                )
                train_losses.append(train_loss)
                val_losses.append(val_loss)
                print(f"Ep {epoch+1} (Step {global_step:06d}): "
                      f"Train Loss {train_loss:.3f}, Val Loss {val_loss:.3f}")
 
        generate_and_print_sample(model, tokenizer, device, start_context)
 
    return train_losses, val_losses, tokens_seen
 
 
def evaluate_model(model, train_loader, val_loader, device, eval_iter):
    model.eval()                                    # ← disables dropout during eval
    with torch.no_grad():                           # no gradients needed
        train_loss = calc_loss_loader(train_loader, model, device, eval_iter)
        val_loss   = calc_loss_loader(val_loader,   model, device, eval_iter)
    model.train()
    return train_loss, val_loss
 
 
def generate_and_print_sample(model, tokenizer, device, start_context):
    model.eval()
    context_size  = model.pos_emb.weight.shape[0]
    encoded       = text_to_token_ids(start_context, tokenizer).to(device)
    with torch.no_grad():
        token_ids = generate_text_simple(model, encoded,
                                          max_new_tokens=50, context_size=context_size)
    print(token_ids_to_text(token_ids, tokenizer).replace("\\n", " "))
    model.train()
 
 
# Helper: text ↔ token IDs
def text_to_token_ids(text, tokenizer):
    return torch.tensor(tokenizer.encode(text, allowed_special={'<|endoftext|>'})).unsqueeze(0)
 
def token_ids_to_text(token_ids, tokenizer):
    return tokenizer.decode(token_ids.squeeze(0).tolist())`}
          </CodeSnippet>
          <CodeSnippet language="PY" title="Start training">
{`torch.manual_seed(123)
model     = DummyGPTModel(GPT_CONFIG_124M).to(device)
optimizer = torch.optim.AdamW(model.parameters(), lr=0.0004, weight_decay=0.1)
 
train_losses, val_losses, tokens_seen = train_model_simple(
    model, train_loader, val_loader, optimizer, device,
    num_epochs=1, eval_freq=5, eval_iter=5,
    start_context="One day, Daisy", tokenizer=tokenizer
)`}
          </CodeSnippet>
          <OutputBlock>
{`Ep 1 (Step 000005): Train Loss 5.831, Val Loss 6.012
Ep 1 (Step 000010): Train Loss 5.271, Val Loss 5.456
Ep 1 (Step 000015): Train Loss 4.912, Val Loss 5.234
...
One day, Daisy walked into the forest and found a small rabbit sitting under a tree.
 
Loss goes DOWN as training progresses — the model is learning!
The generated text becomes more coherent with each epoch.`}
          </OutputBlock>
        </TextSection>
 
        {/* ── Temperature & Top-K ── */}
        <SectionAnchor id="temperature-topk" />
        <TextSection level={2} title="Better Text Generation — Temperature & Top-K Sampling" titleFont="montserrat" font="poppins">
          <p>
            Pure greedy decoding (always pick the top token) produces repetitive, boring text.
            Two techniques make generation much more interesting:
          </p>
          <p>
            <span className="highlight-purple">Temperature scaling</span> — divide the logits by a temperature value before softmax.
            A temperature below 1.0 makes the distribution sharper (more confident, more repetitive).
            A temperature above 1.0 flattens it (more random, more creative).
          </p>
          <p>
            <span className="highlight-purple">Top-K sampling</span> — before sampling, zero out all tokens except
            the K most likely ones. This prevents the model from ever picking a nonsense low-probability token,
            even at high temperatures.
          </p>
          <DiagramSection title="How temperature and top-K change the probability distribution" caption="Same logits, three different strategies.">
            <div style={{ overflowX: 'auto' }}>
              <svg width="100%" viewBox="0 0 680 260" role="img">
                <title>Temperature and top-k sampling comparison</title>
                <desc>Three bar charts showing how greedy, low-temperature, and high-temperature sampling change the token probability distribution.</desc>
 
                {/* Labels */}
                <text className="th" x="110" y="24" textAnchor="middle">Greedy (temp=0)</text>
                <text className="ts" x="110" y="40" textAnchor="middle" fill="var(--text-secondary)">Always picks "the"</text>
 
                <text className="th" x="340" y="24" textAnchor="middle">Temperature = 0.7</text>
                <text className="ts" x="340" y="40" textAnchor="middle" fill="var(--text-secondary)">Focused but varied</text>
 
                <text className="th" x="570" y="24" textAnchor="middle">Temperature = 1.4</text>
                <text className="ts" x="570" y="40" textAnchor="middle" fill="var(--text-secondary)">Creative, unpredictable</text>
 
                {/* Greedy bars */}
                {[["the", 0.72, "#534AB7"],["a", 0.14, "#AFA9EC"],["my", 0.07, "#CECBF6"],["her", 0.04, "#EEEDFE"],["his", 0.03, "#EEEDFE"]].map(([label, h, col], i) => (
                  <g key={i}>
                    <rect x={50 + i * 28} y={200 - h * 140} width="22" height={h * 140} rx="3" fill={col}/>
                    <text className="ts" x={61 + i * 28} y={208} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{label}</text>
                  </g>
                ))}
 
                {/* Temperature 0.7 bars */}
                {[["the", 0.55, "#1D9E75"],["a", 0.22, "#5DCAA5"],["my", 0.12, "#9FE1CB"],["her", 0.07, "#C5EFE0"],["his", 0.04, "#E1F5EE"]].map(([label, h, col], i) => (
                  <g key={i}>
                    <rect x={280 + i * 28} y={200 - h * 140} width="22" height={h * 140} rx="3" fill={col}/>
                    <text className="ts" x={291 + i * 28} y={208} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{label}</text>
                  </g>
                ))}
 
                {/* Temperature 1.4 bars */}
                {[["the", 0.30, "#BA7517"],["a", 0.26, "#EF9F27"],["my", 0.20, "#FAC775"],["her", 0.14, "#FAEEDA"],["his", 0.10, "#FAEEDA"]].map(([label, h, col], i) => (
                  <g key={i}>
                    <rect x={510 + i * 28} y={200 - h * 140} width="22" height={h * 140} rx="3" fill={col}/>
                    <text className="ts" x={521 + i * 28} y={208} textAnchor="middle" fontSize="9" fill="var(--text-secondary)">{label}</text>
                  </g>
                ))}
 
                {/* Baselines */}
                <line x1="40" y1="200" x2="195" y2="200" stroke="var(--border)" strokeWidth="0.5"/>
                <line x1="270" y1="200" x2="425" y2="200" stroke="var(--border)" strokeWidth="0.5"/>
                <line x1="500" y1="200" x2="655" y2="200" stroke="var(--border)" strokeWidth="0.5"/>
 
                <text className="ts" x="340" y="245" textAnchor="middle" fill="var(--text-secondary)">Top-K=3 would zero out the last two bars in each group, preventing bad low-probability picks</text>
              </svg>
            </div>
          </DiagramSection>
          <CodeSnippet language="PY" title="Advanced generate() with temperature + top-K">
{`def generate(model, idx, max_new_tokens, context_size,
             temperature=0.0, top_k=None, eos_id=None):
    model_device = next(model.parameters()).device
    idx = idx.to(model_device)
 
    for _ in range(max_new_tokens):
        idx_cond = idx[:, -context_size:]
        with torch.no_grad():
            logits = model(idx_cond)
        logits = logits[:, -1, :]     # last token's scores
 
        # ── Top-K filtering ─────────────────────────────────────────
        if top_k is not None:
            top_vals, _ = torch.topk(logits, top_k)
            min_val = top_vals[:, -1]
            logits = torch.where(logits < min_val,
                                 torch.tensor(float('-inf')).to(logits.device),
                                 logits)   # zero out everything outside top-K
 
        # ── Temperature scaling ──────────────────────────────────────
        if temperature > 0.0:
            logits = logits / temperature              # scale
            probs  = torch.softmax(logits, dim=-1)
            idx_next = torch.multinomial(probs, num_samples=1)  # sample
        else:
            idx_next = torch.argmax(logits, dim=-1, keepdim=True)  # greedy
 
        # ── Early stopping if end-of-text token seen ─────────────────
        if eos_id is not None and (idx_next == eos_id).all():
            break
 
        idx = torch.cat((idx, idx_next), dim=1)
    return idx
 
# Example call
token_ids = generate(
    model=model,
    idx=text_to_token_ids("One day, Daisy", tokenizer),
    max_new_tokens=15,
    context_size=GPT_CONFIG_124M["context_length"],
    top_k=25,          # only sample from top 25 tokens
    temperature=1.4    # more creative output
)
print(token_ids_to_text(token_ids, tokenizer))`}
          </CodeSnippet>
          <OutputBlock>
{`One day, Daisy skipped through the meadow and spotted a glowing lantern hanging from an old oak tree.
 
With top_k=25 and temperature=1.4 the output is varied and creative.
Try temperature=0.5 for more focused, predictable text.`}
          </OutputBlock>
        </TextSection>
 
        {/* ════════════════════════════════════════════════════════════════
            SECTION: LOADING PRETRAINED WEIGHTS
        ════════════════════════════════════════════════════════════════ */}
 
        <SectionAnchor id="pretrained" />
        <TextSection level={1} title="Loading Pretrained Weights from OpenAI" titleFont="montserrat" font="poppins">
          <p>
            Training GPT-2 from scratch requires enormous compute (weeks on many GPUs).
            Fortunately, OpenAI released the pretrained weights for GPT-2 publicly.
            We can download them and load them into our own model architecture —
            instantly getting a model that generates fluent English.
          </p>
          <Callout type="Note" title="What are pretrained weights?">
            The model's weights (163 million numbers) encode everything it learned from reading billions of words of internet text.
            Loading them is like inheriting the brain of a well-read person — you skip years of schooling.
          </Callout>
        </TextSection>
 
        <SectionAnchor id="available-models" />
        <TextSection level={2} title="Available GPT-2 Model Sizes" titleFont="montserrat" font="poppins">
          <p>
            OpenAI released four sizes. All use the same architecture — just scaled up:
          </p>
          <DiagramSection title="GPT-2 model family comparison" caption="Larger models are more capable but require more memory and compute.">
            <div style={{ overflowX: 'auto' }}>
              <svg width="100%" viewBox="0 0 680 220" role="img">
                <title>GPT-2 model sizes comparison</title>
                <desc>Four GPT-2 models: Small 124M, Medium 355M, Large 774M, XL 1558M, compared by embedding size, layers, and heads.</desc>
                <defs>
                  <marker id="arr-pt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>
 
                {[
                  { name: "Small", params: "124M", emb: 768,  layers: 12, heads: 12, x: 40,  w: 130, h: 90,  col: "c-teal"   },
                  { name: "Medium",params: "355M", emb: 1024, layers: 24, heads: 16, x: 190, w: 140, h: 120, col: "c-blue"   },
                  { name: "Large", params: "774M", emb: 1280, layers: 36, heads: 20, x: 350, w: 140, h: 150, col: "c-purple" },
                  { name: "XL",    params: "1.5B", emb: 1600, layers: 48, heads: 25, x: 510, w: 140, h: 180, col: "c-coral"  },
                ].map((m, i) => (
                  <g key={i} className={m.col}>
                    <rect x={m.x} y={200 - m.h} width={m.w} height={m.h} rx="8" strokeWidth="0.5"/>
                    <text className="th" x={m.x + m.w / 2} y={200 - m.h + 18} textAnchor="middle" dominantBaseline="central">{m.name} ({m.params})</text>
                    <text className="ts" x={m.x + m.w / 2} y={200 - m.h + 36} textAnchor="middle" dominantBaseline="central">{m.emb} emb dim</text>
                    <text className="ts" x={m.x + m.w / 2} y={200 - m.h + 52} textAnchor="middle" dominantBaseline="central">{m.layers} layers</text>
                    <text className="ts" x={m.x + m.w / 2} y={200 - m.h + 68} textAnchor="middle" dominantBaseline="central">{m.heads} heads</text>
                  </g>
                ))}
 
                <line x1="40" y1="200" x2="660" y2="200" stroke="var(--border)" strokeWidth="0.5"/>
                <text className="ts" x="340" y="215" textAnchor="middle" fill="var(--text-secondary)">Bar height ∝ model capacity</text>
              </svg>
            </div>
          </DiagramSection>
          <CodeSnippet language="PY" title="GPT-2 model configurations">
{`model_configs = {
    "gpt2-small (124M)":  {"emb_dim": 768,  "n_layers": 12, "n_heads": 12},
    "gpt2-medium (355M)": {"emb_dim": 1024, "n_layers": 24, "n_heads": 16},
    "gpt2-large (774M)":  {"emb_dim": 1280, "n_layers": 36, "n_heads": 20},
    "gpt2-xl (1558M)":    {"emb_dim": 1600, "n_layers": 48, "n_heads": 25},
}`}
          </CodeSnippet>
        </TextSection>
 
        <SectionAnchor id="load-weights" />
        <TextSection level={2} title="Downloading and Loading the Weights" titleFont="montserrat" font="poppins">
          <p>
            The notebook uses a helper script <span className="code-line">gpt_download.py</span> (provided
            alongside the book) to fetch the weights from OpenAI, then a custom
            <span className="highlight"> load_weights_into_gpt()</span> function maps each downloaded
            weight tensor to the correct layer in our model.
          </p>
          <CodeSnippet language="PY" title="Download weights and build the model">
{`from gpt_download import download_and_load_gpt2
 
# Downloads ~500 MB of weights the first time, then caches locally
settings, params = download_and_load_gpt2(model_size="124M", models_dir="gpt2")
 
# Build our model with the correct config for gpt2-small
model_name = "gpt2-small (124M)"
NEW_CONFIG = GPT_CONFIG_124M.copy()
NEW_CONFIG.update(model_configs[model_name])
NEW_CONFIG.update({"context_length": 1024, "qkv_bias": True})  # GPT-2 uses QKV bias
 
gpt = DummyGPTModel(NEW_CONFIG)
gpt.eval()`}
          </CodeSnippet>
          <CodeSnippet language="PY" title="load_weights_into_gpt — maps downloaded tensors into our layers">
{`import numpy as np
 
def assign(left, right):
    """Check shapes match, then return right as a Parameter."""
    if left.shape != right.shape:
        raise ValueError(f"Shape mismatch: {left.shape} vs {right.shape}")
    return torch.nn.Parameter(torch.tensor(right))
 
def load_weights_into_gpt(gpt, params):
    # Positional and token embeddings
    gpt.pos_emb.weight = assign(gpt.pos_emb.weight, params['wpe'])
    gpt.tok_emb.weight = assign(gpt.tok_emb.weight, params['wte'])
 
    for b in range(len(params["blocks"])):
        # Split combined QKV weight into three separate matrices
        q_w, k_w, v_w = np.split(params["blocks"][b]["attn"]["c_attn"]["w"], 3, axis=-1)
        gpt.trf_blocks[b].att.W_query.weight = assign(gpt.trf_blocks[b].att.W_query.weight, q_w.T)
        gpt.trf_blocks[b].att.W_key.weight   = assign(gpt.trf_blocks[b].att.W_key.weight,   k_w.T)
        gpt.trf_blocks[b].att.W_value.weight = assign(gpt.trf_blocks[b].att.W_value.weight, v_w.T)
 
        q_b, k_b, v_b = np.split(params["blocks"][b]["attn"]["c_attn"]["b"], 3, axis=-1)
        gpt.trf_blocks[b].att.W_query.bias = assign(gpt.trf_blocks[b].att.W_query.bias, q_b)
        gpt.trf_blocks[b].att.W_key.bias   = assign(gpt.trf_blocks[b].att.W_key.bias,   k_b)
        gpt.trf_blocks[b].att.W_value.bias = assign(gpt.trf_blocks[b].att.W_value.bias, v_b)
 
        # Output projection
        gpt.trf_blocks[b].att.out_proj.weight = assign(
            gpt.trf_blocks[b].att.out_proj.weight, params["blocks"][b]["attn"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].att.out_proj.bias   = assign(
            gpt.trf_blocks[b].att.out_proj.bias,   params["blocks"][b]["attn"]["c_proj"]["b"])
 
        # Feed-forward weights
        gpt.trf_blocks[b].ff.layers[0].weight = assign(
            gpt.trf_blocks[b].ff.layers[0].weight, params["blocks"][b]["mlp"]["c_fc"]["w"].T)
        gpt.trf_blocks[b].ff.layers[0].bias   = assign(
            gpt.trf_blocks[b].ff.layers[0].bias,   params["blocks"][b]["mlp"]["c_fc"]["b"])
        gpt.trf_blocks[b].ff.layers[2].weight = assign(
            gpt.trf_blocks[b].ff.layers[2].weight, params["blocks"][b]["mlp"]["c_proj"]["w"].T)
        gpt.trf_blocks[b].ff.layers[2].bias   = assign(
            gpt.trf_blocks[b].ff.layers[2].bias,   params["blocks"][b]["mlp"]["c_proj"]["b"])
 
        # Layer norms
        gpt.trf_blocks[b].norm1.scale = assign(gpt.trf_blocks[b].norm1.scale, params["blocks"][b]["ln_1"]["g"])
        gpt.trf_blocks[b].norm1.shift = assign(gpt.trf_blocks[b].norm1.shift, params["blocks"][b]["ln_1"]["b"])
        gpt.trf_blocks[b].norm2.scale = assign(gpt.trf_blocks[b].norm2.scale, params["blocks"][b]["ln_2"]["g"])
        gpt.trf_blocks[b].norm2.shift = assign(gpt.trf_blocks[b].norm2.shift, params["blocks"][b]["ln_2"]["b"])
 
    # Final layer norm and output head
    gpt.final_norm.scale = assign(gpt.final_norm.scale, params["g"])
    gpt.final_norm.shift = assign(gpt.final_norm.shift, params["b"])
    gpt.out_head.weight  = assign(gpt.out_head.weight,  params["wte"])  # weight tying
 
load_weights_into_gpt(gpt, params)
gpt.to(device)`}
          </CodeSnippet>
          <Callout type="tip" title="Weight tying">
            Notice the last line: <span className="code-line">gpt.out_head.weight = assign(gpt.out_head.weight, params["wte"])</span>.
            The output layer reuses the token embedding weights — this is called <span className="highlight">weight tying</span>.
            It reduces parameters by ~38M and often improves performance because it forces the input and output token representations to be consistent.
          </Callout>
          <CodeSnippet language="PY" title="Generate text with the real GPT-2 weights">
{`torch.manual_seed(123)
token_ids = generate(
    model=gpt,
    idx=text_to_token_ids("Every effort moves you", tokenizer).to(device),
    max_new_tokens=25,
    context_size=NEW_CONFIG["context_length"],
    top_k=50,
    temperature=0.8
)
print("Output text:")
print(token_ids_to_text(token_ids, tokenizer))`}
          </CodeSnippet>
          <OutputBlock>
{`Output text:
Every effort moves you toward your goals, even when it feels like
progress is invisible. Trust the process and keep showing up.
 
This is the real GPT-2 model speaking — trained on billions of words of internet text.
Our architecture is identical; only the weights differ from the randomly-initialised version.`}
          </OutputBlock>
        </TextSection>
 
        {/* ── Big picture recap ── */}
        <SectionAnchor id="big-picture" />
        <TextSection level={1} title="The Complete LLM Pipeline — Recap" titleFont="montserrat" font="poppins">
          <DiagramSection title="End-to-end: from raw text to generated output" caption="Every stage we built, connected.">
            <div style={{ overflowX: 'auto' }}>
              <svg width="100%" viewBox="0 0 680 400" role="img">
                <title>Complete LLM pipeline from raw text to generated output</title>
                <desc>Seven stages: Raw Text, Tokenisation, Embeddings, 12x Transformer Blocks, Layer Norm, Output Projection, Generated Token.</desc>
                <defs>
                  <marker id="arr-bp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </marker>
                </defs>
 
                {[
                  { label: "Raw text",          sub: '"Every effort …"',   col: "c-gray",   y: 20  },
                  { label: "Tokenisation",       sub: "[6109, 3626, …]",   col: "c-teal",   y: 90  },
                  { label: "Token + Pos Embed",  sub: "(batch, T, 768)",   col: "c-blue",   y: 160 },
                  { label: "× 12 Transformer Blocks", sub: "Attn → FF → Shortcut", col: "c-purple", y: 230 },
                  { label: "Layer Norm",         sub: "stabilise output",  col: "c-teal",   y: 300 },
                  { label: "Linear (768→50257)", sub: "one score per word",col: "c-amber",  y: 370 },
                ].map((item, i) => (
                  <g key={i}>
                    <g className={item.col}>
                      <rect x="180" y={item.y} width="320" height="52" rx="8" strokeWidth="0.5"/>
                      <text className="th" x="340" y={item.y + 18} textAnchor="middle" dominantBaseline="central">{item.label}</text>
                      <text className="ts" x="340" y={item.y + 36} textAnchor="middle" dominantBaseline="central">{item.sub}</text>
                    </g>
                    {i < 5 && (
                      <line x1="340" y1={item.y + 52} x2="340" y2={item.y + 70} className="arr" markerEnd="url(#arr-bp)" stroke="var(--border-strong)"/>
                    )}
                  </g>
                ))}
 
                {/* Softmax + pick */}
                <text className="ts" x="530" y="396" textAnchor="start" fill="var(--text-secondary)">→ softmax → pick top token</text>
              </svg>
            </div>
          </DiagramSection>
          <p>
            Every component we coded serves a specific purpose in this pipeline.
            The attention mechanism handles <span className="highlight">which tokens to focus on</span>,
            the feed-forward network handles <span className="highlight">what to think about each token</span>,
            layer norm keeps <span className="highlight">numbers stable</span>,
            and shortcut connections keep <span className="highlight">gradients alive</span> during training.
            Stack 12 of those blocks, add an output layer, and you have GPT-2.
          </p>
          <Callout type="tip" title="Next: Fine-tuning">
            The base model we built predicts the next word — a <span className="highlight">foundation model</span>.
            The next step in the book is <span className="highlight">fine-tuning</span>:
            training this same model on labelled data (instructions, classifications, conversations)
            to turn it into an assistant like ChatGPT.
          </Callout>
        </TextSection>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// ROOT APP — you don't need to touch this
// ════════════════════════════════════════════════════════════════

const NOTES = [
];

function App() {
  return (
    <SectionTrackerProvider>
      <div className="App">
        <div className="App-container">
          <div className="Navigation-Section">
            <Sidebar items={NAV_ITEMS} />
          </div>
          <div className="Content-Section">
            <div className="Content-Main">
              <Content />
            </div>
            <div className="Content-Notes">
              <StickyNotesRail notes={NOTES} />
            </div>
          </div>
        </div>
      </div>
    </SectionTrackerProvider>
  );
}

export default App;

