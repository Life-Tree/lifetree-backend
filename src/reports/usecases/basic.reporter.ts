import { Inject, Injectable } from "@nestjs/common";
import { Diagnosis } from "../core/domain/diagnosis";
import { Image } from "../core/domain/image";
import { ImageSet } from "../core/domain/imageset";
import { Report } from "../core/domain/report";
import { ReportedSignSymptom } from "../core/domain/reportedSignSymptom";
import { Tree } from "../core/domain/tree";
import { IReporter } from "../core/ports/inbounding/reporter";
import { IDiagnostician } from "../core/ports/outbounding/diagnostician";
import { IReportRepository } from "../core/ports/outbounding/repository/report.repository";
import { ITreeRepository } from "../core/ports/outbounding/repository/tree.repository";
import { IStorage } from "../core/ports/outbounding/storage";
import { IVision } from "../core/ports/outbounding/vision";

@Injectable()
export class BasicReporter implements IReporter {

    constructor(
        @Inject('CloudinaryStorage')
        private storageService: IStorage, 
        @Inject('ReportRepository')
        private reportRepository: IReportRepository, 
        @Inject('BasicDiagnostician')
        private diagnostician: IDiagnostician,
        @Inject('TreeRepository')
        private treeRepository: ITreeRepository){}

    async report(report: Report): Promise<Report> {
        // Image processing
        const savedImageSet: ImageSet = await this.saveImages(report.getReportedTree().getImageSet());
        report.getReportedTree().setImageSet(savedImageSet);
        const savedReportedSignSymptoms : ReportedSignSymptom[] = await this.saveReportedSignSymptomsImages(report.getReportedTree().getHealthStatus().getReportedSignSymptoms());
        report.getReportedTree().getHealthStatus().setReportedSignSymptoms(savedReportedSignSymptoms);
        
        // Diagnosis
        if(report.getReportedTree().getHealthStatus().getDiagnosis() == null) {
            const diagnosis: Diagnosis = await this.diagnostician.diagnose(report.getReportedTree().getHealthStatus().getReportedSignSymptoms());
            report.getReportedTree().getHealthStatus().setDiagnosis(diagnosis);
        }       
        
        // Save tree
        const savedTree: Tree = await this.treeRepository.saveTree(report.getReportedTree());
        report.setReportedTree(savedTree);
        
        // Save and return report
        return await this.reportRepository.saveReport(report);
    }

    private async saveImages(imageSet: ImageSet): Promise<ImageSet> {
        const images = imageSet.getImages();
        const newImageSet: ImageSet = new ImageSet();
        for (const image of images) {
            const url = await this.storageService.saveImage(image.getBase64());
            image.setUrl(url);
            image.setBase64("");
            newImageSet.addImage(image);
        }
        return newImageSet;
    }

    private async saveReportedSignSymptomsImages(reportedSignSymptoms: ReportedSignSymptom[]): Promise<ReportedSignSymptom[]> {
        const result: ReportedSignSymptom[] = [];
        for (const reportedSignSymp of reportedSignSymptoms) {
            const imageSet: ImageSet = await this.saveImages(reportedSignSymp.getImageSet())
            reportedSignSymp.setImageSet(imageSet);
            result.push(reportedSignSymp);
        }
        return result;
    }

}