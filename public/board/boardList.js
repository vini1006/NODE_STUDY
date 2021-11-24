
$(document).ready(() => {
    class Board {
        constructor() {
            this.modal = $("#modal");
            this.titleArea = this.modal.find("#titleArea");
            this.textArea = this.modal.find("#textArea");
            this.saveButton = this.modal.find("#save");
            this.editButton = this.modal.find("#edit");
            this.deleteButton = this.modal.find("#delete");
        }
    
        getTitle () {
            return this.titleArea.val();
        }
    
        getText () {
            return this.textArea.summernote('code');
        }

        clearAll() {
            this.titleArea.val('');
            this.textArea.summernote('code', '');
        }

        closeModal() {
            this.modal.hide();
        }

        showCreateModal () {
            this.saveButton.show();
            this.editButton.hide();
            this.deleteButton.hide();
            this.modal.show();
        }

        showEditModal () {
            this.editButton.show();
            this.deleteButton.show();
            this.saveButton.hide();
            this.modal.show();
        }

        async savePost(title, text) {
            try {
                return await axios.post('/board/create', {title ,text})
            } catch (error) {
                throw error;
            }
        }
    }
    
    const boardComponent = new Board();

    $('.summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 300,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });

    $(document).off("click", "#write").on("click", "#write", function () {
        boardComponent.showCreateModal();
    });

    $(document).off("click", "#modal-close").on("click", "#modal-close", function () {
        boardComponent.closeModal();
    });

    boardComponent.saveButton.on("click", async function() {
        if(!boardComponent.getTitle()) alert("Enter title");
        if(!boardComponent.getText()) alert("Enter text");

        const title = boardComponent.getTitle();
        const text = boardComponent.getText();

        try {
            const axiosResult = await boardComponent.savePost(title, text);
            const createResult = axiosResult.data;

            if(createResult === "success") {
                alert("썽꽁");
                boardComponent.clearAll();
                boardComponent.closeModal();
            }
        } catch (error) {
            console.log(`🚀 ~ file: boardList.js ~ line 78 ~ boardComponent.saveButton.on ~ error`, error)
            alert(error);
        }
    });

    

})